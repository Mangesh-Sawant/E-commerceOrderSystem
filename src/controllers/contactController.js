const ContactMessage = require("../models/ContactMessage");

// Submit a new contact message (Public)
const submitContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContactMessage = new ContactMessage({
            name,
            email,
            subject,
            message
        });

        await newContactMessage.save();

        return res.status(201).json({
            message: "Your message has been sent successfully",
            contactMessage: newContactMessage
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all contact messages (Admin only)
const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitContactMessage,
    getContactMessages
};
