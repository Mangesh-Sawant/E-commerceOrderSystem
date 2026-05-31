const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        )

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Resistered Successfully",
            user
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};



const logIn= async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Step 1: check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with this email" });
        }

        // Step 2: generate a random raw token using Node's built-in crypto
        const rawToken = crypto.randomBytes(32).toString("hex");

        // Step 3: hash the token before saving to DB (for security)
        // Never store raw tokens in DB — if DB is leaked, tokens are useless
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        // Step 4: save hashed token + expiry (15 minutes from now) on user
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        // Step 5: in production → send rawToken via email link
        // e.g. https://yourapp.com/reset-password/<rawToken>
        // For now, returning it in response for testing
        res.status(200).json({
            message: "Password reset token generated",
            resetToken: rawToken // send this in email in production
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Step 1: hash the incoming raw token to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Step 2: find user with matching token AND token not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() } // $gt = greater than (not expired)
        });

        if (!user) {
            return res.status(400).json({ message: "Token is invalid or has expired" });
        }

        // Step 3: hash the new password
        user.password = await bcrypt.hash(newPassword, 10);

        // Step 4: clear the reset token fields so it can't be reused
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ─── GET MY PROFILE ─────────────────────────────────────────────
// protect middleware runs first → sets req.user.id
// we use that id to find the logged-in user's data
const getProfile = async (req, res) => {
    try {
        // findById using the id from JWT token (set by protect middleware)
        // .select("-password") → returns all fields EXCEPT password
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ─── UPDATE MY PROFILE ──────────────────────────────────────────
// User can update their name and email only
// They should NOT be able to update password here (separate API for that)
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if another user already has this email
        if (email) {
            const emailTaken = await User.findOne({ email, _id: { $ne: req.user.id } });
            // $ne = "not equal" → finds user with this email but NOT the current user
            if (emailTaken) {
                return res.status(400).json({ message: "Email is already in use" });
            }
        }

        // findByIdAndUpdate: finds user by id, applies updates, returns updated doc
        // { new: true } → returns the UPDATED document, not the old one
        // { runValidators: true } → runs schema validations on update
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ─── CHANGE PASSWORD ────────────────────────────────────────────
// User must provide their current password to prove it's really them
// Then set a new password — requires being logged in (protect middleware)
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Fetch user WITH password (select adds it back since profile hides it)
        const user = await User.findById(req.user.id).select("+password");

        // Verify current password is correct before allowing change
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash and save the new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { registerUser, logIn, forgotPassword, resetPassword, getProfile, updateProfile, changePassword };