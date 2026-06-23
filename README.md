# Shri Ramji Photo State - Full Stack Website

Modern, fast, smooth AI-inspired website for "Shri Ramji Photo State" — a professional photo studio and products business.

## 🎨 Tech Stack
- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (httpOnly cookies)
- **Image Upload**: Multer + Cloudinary
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

### Public Website
- 🏠 **Home Page** - Hero banner with featured products carousel
- 🛍️ **Products** - Grid with filters and search
- 📸 **Product Details** - Full info with gallery
- 👥 **About Us** - Studio story and team
- 📞 **Contact** - Form with WhatsApp integration
- 🎞️ **Gallery** - Studio showcase
- ⚡ **Smooth Animations** - AI-like modern UX

### Admin Dashboard
- 🔐 **Secure Login** - JWT protected routes
- 📊 **Dashboard** - Stats and analytics
- 📦 **Product Management** - CRUD operations
- 🏷️ **Category Management** - Organize products
- 🖼️ **Gallery Upload** - Manage studio images
- 💬 **Enquiry Management** - Track customer messages
- ⚙️ **Settings** - Studio configuration

## 📋 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone repository
```bash
git clone https://github.com/shriramjisewari-droid/Shri-Ramji-Photo-State.git
cd Shri-Ramji-Photo-State
```

2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Update .env with your credentials
npm start
```

3. Setup Frontend
```bash
cd ../client
npm install
npm start
```

## 🎯 Development

This project follows a modern, clean architecture with:
- Modular component structure
- Reusable hooks and utilities
- Responsive design (mobile-first)
- Smooth animations and transitions
- Professional white theme with accent colors

---

**Status**: 🚧 Under Development
