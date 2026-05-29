# E-Commerce Order System - Backend API Documentation

This document outlines the complete backend architecture, data models, and API endpoints for the E-Commerce Order System. It is designed to be used as context for building a frontend prototype application.

## 🚀 System Overview
- **Tech Stack:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens) sent via `Authorization: Bearer <token>` header
- **Roles:** `user` (default) and `admin`

---

## 🗄️ Data Models (MongoDB)

### 1. User
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)
- `role` (String, enum: `["user", "admin"]`, default: `"user"`)
- `resetPasswordToken` (String)
- `resetPasswordExpire` (Date)

### 2. Product
- `title` (String)
- `price` (Number)
- `description` (String)
- `category` (String, default: `"general"`)
- `stock` (Number)

### 3. Banner
- `message` (String)
- `isActive` (Boolean, default: `true`)
- `link` (String, default: `""`)
- `backgroundColor` (String, default: `"#4F46E5"`)

### 4. Cart
- `userId` (ObjectId, ref: User)
- `items`: Array of objects
  - `productId` (ObjectId, ref: Product)
  - `quantity` (Number)

### 4. Order
- `userId` (ObjectId, ref: User)
- `items`: Array of objects (snapshot of cart items)
  - `productId` (ObjectId, ref: Product)
  - `quantity` (Number)
  - `price` (Number, price at time of purchase)
- `totalAmount` (Number)
- `status` (String, enum: `["pending", "confirmed", "shipped", "delivered", "cancelled"]`, default: `"pending"`)

---

## 🔌 API Endpoints

### 🔐 Authentication (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/login` | Login user, returns JWT and user details | No |
| POST | `/register` | Register new user account | No |
| POST | `/forgot-password` | Request password reset token | No |
| POST | `/reset-password/:token` | Reset password using token | No |
| GET | `/profile` | Get current logged-in user details | Yes (User/Admin) |
| PUT | `/profile` | Update name/email of current user | Yes (User/Admin) |
| PUT | `/change-password` | Change password of current user | Yes (User/Admin) |

### 📦 Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Get all products (Supports query params: `search`, `category`, `page`, `limit`) | No |
| GET | `/:id` | Get single product by ID | No |
| POST | `/` | Create a new product | Yes (Admin only) |
| PUT | `/:id` | Update an existing product | Yes (Admin only) |
| DELETE | `/:id` | Delete a product | Yes (Admin only) |

### 🛒 Shopping Cart (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Get current user's cart | Yes (User) |
| POST | `/add` | Add product to cart (Body: `{ productId, quantity }`) | Yes (User) |
| PUT | `/:productId` | Update item quantity in cart (Body: `{ quantity }`) | Yes (User) |
| DELETE | `/:productId` | Remove specific product from cart | Yes (User) |
| DELETE | `/` | Clear entire cart | Yes (User) |

### 🚚 Orders (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/` | Place order from current cart items (auto-reduces product stock and clears cart) | Yes (User) |
| GET | `/` | Get order history for current user | Yes (User) |
| GET | `/:id` | Get single order details (must belong to user) | Yes (User) |
| PUT | `/:id/cancel` | Cancel an order (auto-restores product stock, only if status is pending/confirmed) | Yes (User) |

### 📣 Dynamic Banner (`/api/banner`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Get the currently active banner | No |
| PUT | `/` | Update the banner text, color, link, or active status | Yes (Admin) |

### 🛡️ Admin Panel (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/stats` | Get dashboard stats (Total Users, Orders, Revenue, Breakdown by Status) | Yes (Admin) |
| GET | `/users` | Get all registered users | Yes (Admin) |
| DELETE | `/users/:id` | Delete a user (Cannot delete self) | Yes (Admin) |
| POST | `/users/create-admin`| Create another admin account | Yes (Admin) |
| GET | `/orders` | Get all orders from all users | Yes (Admin) |
| PUT | `/orders/:id/status` | Update order status (pending, confirmed, shipped, delivered, cancelled) | Yes (Admin) |

---

## 🛠️ Key Business Logic Notes for UI Development

1. **Authentication State:**
   - Store the JWT securely (localStorage or cookies).
   - Attach it as `Authorization: Bearer <token>` to all protected requests.
   - UI should conditionally render Admin tools if `user.role === 'admin'`.

2. **Product Browsing (Public):**
   - The `GET /api/products` API is paginated. It returns `{ total, page, totalPages, products }`.
   - Use `?search=term` and `?category=name` for search and filtering.

3. **Cart & Orders:**
   - Placing an order requires items to be in the cart first.
   - When an order is successfully placed, the backend automatically clears the cart and reduces stock.
   - Users can only cancel an order if it hasn't been shipped/delivered.

4. **Admin Setup:**
   - If starting fresh, run `node src/scripts/createAdmin.js` to seed the first super admin (`admin@example.com` / `Admin@123`).
