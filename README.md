# Shri Ramji Photo State - Full Stack E-Commerce Website

Modern, fast, smooth AI-inspired e-commerce website for "Shri Ramji Photo State" — a professional photo studio and products business.

## 🎨 Tech Stack
- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (httpOnly cookies)
- **Image Upload**: Multer + Cloudinary
- **Payment**: Razorpay Integration
- **Design Theme**: Clean white modern aesthetic with smooth animations

## 📁 Project Structure

```
Shri-Ramji-Photo-State/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, error handling
│   ├── controllers/       # Business logic
│   ├── uploads/           # Temp storage
│   ├── server.js
│   └── package.json
├── .env.example
└── README.md
```

## 🚀 Features

### 🛍️ E-Commerce Features
- **Product Catalog** - Grid with categories, search, filters
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout** - Secure payment with Razorpay
- **Order Tracking** - View order history and status
- **Product Reviews** - Customer ratings and feedback
- **Wishlist** - Save favorite products
- **User Profile** - Manage orders and preferences

### 📊 Admin Dashboard
- **Dashboard** - Sales stats, revenue graphs, recent orders
- **Product Management** - CRUD with image upload
- **Category Management** - Organize products
- **Order Management** - Track and manage orders
- **Customer Management** - View customer details
- **Payment Reports** - Transaction history
- **Gallery Management** - Manage product images
- **Settings** - Update studio information

### 📱 Public Website
- **Home Page** - Hero banner with featured products carousel
- **Products Page** - Grid with advanced filters
- **Product Detail** - Full info, gallery, reviews
- **Shopping Cart** - Manage items before checkout
- **Checkout** - Secure payment process
- **My Orders** - Order history and tracking
- **About Us** - Studio story
- **Contact** - Contact form with WhatsApp
- **Gallery** - Studio showcase

## 💾 Database Models

```javascript
// Product
{ name, description, price, category, images, stock, rating, reviews, isVisible }

// Category
{ name, slug, image }

// Cart
{ user, items: [{product, quantity, price}], total }

// Order
{ user, items, total, status, payment, shippingAddress, createdAt }

// Review
{ product, user, rating, comment, createdAt }

// User
{ name, email, password, phone, address, orders, wishlist }
```

## 🔌 API Routes

```
# Products
GET    /api/products
GET    /api/products/:id
GET    /api/categories

# Cart
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/update/:id
DELETE /api/cart/remove/:id

# Orders
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

# Reviews
POST   /api/reviews
GET    /api/reviews/:productId

# Admin
POST   /api/admin/login
GET    /api/admin/dashboard
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/admin/orders
PUT    /api/admin/orders/:id
```

## 📋 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn
- Razorpay account for payments

### Installation

```bash
# 1. Clone repository
git clone https://github.com/shriramjisewari-droid/Shri-Ramji-Photo-State.git
cd Shri-Ramji-Photo-State

# 2. Setup Backend
cd server
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev

# 3. Setup Frontend (in new terminal)
cd ../client
npm install
npm start
```

## 🎯 Development

This project follows modern best practices:
- Modular component structure
- Reusable hooks and utilities
- Responsive design (mobile-first)
- Smooth animations and transitions
- Professional white theme with accent colors
- Secure authentication with JWT
- RESTful API architecture

---

**Status**: 🚧 Under Development
**Version**: 1.0.0
