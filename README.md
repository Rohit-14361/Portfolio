# 🚀 Rohit Kumar — Full Stack Developer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Full%20Stack%20Developer-blue?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A professional full-stack portfolio website built for freelancing, job applications, marketing, and internship purposes.**

[🌐 Live Demo](#) · [📬 Contact](#contact) · [📄 API Docs](#api-reference)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Pages & Components](#pages--components)
- [Database Models](#database-models)
- [Payment Integration](#payment-integration)
- [Admin Panel](#admin-panel)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🧑‍💻 About the Project

This is a **full-stack personal portfolio website** for **Rohit Kumar**, a Full Stack Developer specializing in:

- **MERN Stack** (MongoDB, Express, React, Node.js)
- **Next.js** & **TypeScript**
- **AWS Deployment**
- **SEO**, **Google Ads** & **Analytics**

The platform serves multiple professional purposes:

| Purpose | Description |
|---|---|
| 🧑‍💼 **Freelancing** | Clients can browse services, request projects, and pay online via Razorpay |
| 💼 **Job Applications** | Showcases portfolio items, skills, and past projects for recruiters |
| 📢 **Marketing** | Built-in contact form and service listing for lead generation |
| 🎓 **Internships** | Demonstrates full-stack capability with real-world tech stack |

---

## ✨ Features

- 🎨 **Dark, modern UI** with glassmorphism and gradient effects
- 🔐 **JWT-based Authentication** (Login / Signup / Role-based access)
- 👤 **Admin Dashboard** to manage services, portfolio items & projects
- 📁 **Portfolio Gallery** with Cloudinary image uploads
- 🛠️ **Services Listing** — dynamically managed from the admin panel
- 📬 **Contact Form** with email notifications via Nodemailer
- 💳 **Razorpay Payment Integration** — clients can pay for project requests
- 📊 **Project Request System** — users can submit project briefs and track status
- 📱 **Fully Responsive** layout across all screen sizes
- ⚡ **Next.js App Router** with Redux Toolkit for global state management

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.6 | React Framework with App Router |
| **React** | 19.2.4 | UI Library |
| **Redux Toolkit** | ^2.12.0 | Global State Management |
| **Axios** | ^1.16.1 | HTTP Client |
| **Tailwind CSS** | ^4 | Utility-first Styling |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | — | JavaScript Runtime |
| **Express.js** | ^5.2.1 | Web Framework |
| **MongoDB** | — | NoSQL Database |
| **Mongoose** | ^9.6.2 | MongoDB ODM |
| **JWT** | ^9.0.3 | Authentication Tokens |
| **Bcrypt** | ^6.0.0 | Password Hashing |
| **Cloudinary** | ^1.41.3 | Image Storage & CDN |
| **Multer** | ^2.1.1 | File Upload Handling |
| **Nodemailer** | ^8.0.7 | Email Notifications |
| **Razorpay** | ^2.9.6 | Payment Gateway |
| **dotenv** | ^17.4.2 | Environment Variables |

---

## 📁 Project Structure

```
Portfolio/
├── frontend/                   # Next.js Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Reusable UI Components
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Hero.js
│   │   │   │   ├── ServiceSection.js
│   │   │   │   ├── ProjectSection.js
│   │   │   │   ├── ContactSection.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── About.js
│   │   │   │   └── Skills.js
│   │   │   ├── admin/          # Admin-only pages
│   │   │   ├── dashboard/      # User dashboard
│   │   │   ├── services/       # Services page
│   │   │   ├── projects/       # Projects page
│   │   │   ├── contact/        # Contact page
│   │   │   ├── login/          # Login page
│   │   │   ├── signup/         # Signup page
│   │   │   └── page.js         # Home page
│   │   ├── providers/          # Context/Redux Providers
│   │   ├── redux/              # Redux Store & Slices
│   │   │   └── slices/
│   │   │       └── authSlice.js
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   ├── package.json
│   └── next.config.mjs
│
├── backend/                    # Express.js REST API
│   ├── controllers/            # Route handler logic
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Project.js
│   │   ├── PortfolioItem.js
│   │   └── ContactUs.js
│   ├── routes/                 # API route definitions
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── projects.js
│   │   ├── portfolio.js
│   │   ├── payments.js
│   │   └── contact.js
│   ├── middleware/             # Auth & validation middleware
│   ├── db/                     # Database connection
│   ├── utils/                  # Helper utilities
│   ├── template/               # Email templates
│   ├── .env                    # Environment variables (not committed)
│   ├── index.js                # App entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- A [Cloudinary](https://cloudinary.com/) account
- A [Razorpay](https://razorpay.com/) account (for payments)

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

**2. Install Backend Dependencies**
```bash
cd backend
npm install
```

**3. Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

---

### Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
# Server
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (Email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

For the frontend, create a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Running the App

**Start the Backend (Development)**
```bash
cd backend
npm run dev
```
> The API server will start on `http://localhost:5000`

**Start the Frontend (Development)**
```bash
cd frontend
npm run dev
```
> The Next.js app will start on `http://localhost:3000`

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### 🔐 Authentication — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive JWT token |

---

### 🛠️ Services — `/api/services`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all services |
| `POST` | `/` | Admin | Create a new service |
| `PUT` | `/:id` | Admin | Update a service |
| `DELETE` | `/:id` | Admin | Delete a service |

---

### 🗂️ Portfolio Items — `/api/portfolio`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all portfolio items |
| `POST` | `/` | Admin | Upload a new portfolio item (image via Cloudinary) |
| `PUT` | `/:id` | Admin | Update a portfolio item |
| `DELETE` | `/:id` | Admin | Delete a portfolio item |

---

### 📁 Projects — `/api/projects`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Private | Get all projects (user-scoped) |
| `POST` | `/` | Private | Submit a new project request |
| `PUT` | `/:id` | Admin | Update project status |
| `DELETE` | `/:id` | Admin | Delete a project |

---

### 💳 Payments — `/api/payments`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/create-order` | Private | Create a Razorpay payment order |
| `POST` | `/verify` | Private | Verify payment after completion |
| `POST` | `/webhook` | Public | Razorpay webhook (signature verified) |

---

### 📬 Contact — `/api/contact`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | Public | Submit a contact form message |

---

## 🖥️ Pages & Components

### Pages

| Route | Description |
|---|---|
| `/` | Home page — Hero, Services preview, Projects, Contact |
| `/services` | Full services listing |
| `/projects` | Full portfolio/projects gallery |
| `/contact` | Dedicated contact form page |
| `/login` | User login |
| `/signup` | User registration |
| `/dashboard` | Authenticated user dashboard (project tracking, payments) |
| `/admin/dashboard` | Admin panel (manage services, portfolio, projects) |

### Key Components

| Component | Description |
|---|---|
| `Navbar` | Sticky header with auth-aware navigation (Login/Logout/Dashboard) |
| `Hero` | Landing section with tagline, skills, GitHub & LinkedIn links |
| `ServiceSection` | Dynamic service cards fetched from the API |
| `ProjectSection` | Portfolio gallery with Cloudinary-hosted images |
| `ContactSection` | Contact form with backend email integration |
| `Footer` | Site footer |
| `About` | Developer bio section |
| `Skills` | Technical skills showcase |

---

## 🗄️ Database Models

### User
```
name         String    (required)
email        String    (required, unique)
password     String    (hashed with bcrypt)
role         Enum      ["user", "admin"] (default: "user")
timestamps   Date
```

### Service
```
title        String    (required)
description  String    (required)
timestamps   Date
```

### Project
```
user              ObjectId  (ref: User, required)
projectName       String    (required)
requestDetails    String    (required)
investmentAmount  Number    (default: 0)
projectStatus     Enum      ["pending", "in-progress", "completed"]
paymentStatus     Enum      ["pending", "completed"]
razorpayOrderId   String
razorpayPaymentId String
timestamps        Date
```

### PortfolioItem
```
title        String
description  String
imageUrl     String  (Cloudinary URL)
timestamps   Date
```

### ContactUs
```
name         String
email        String
message      String
timestamps   Date
```

---

## 💳 Payment Integration

This portfolio uses **Razorpay** for handling client payments for project requests.

**Flow:**
1. Authenticated user submits a **project request** with budget details
2. Admin reviews and sets the **investment amount**
3. User initiates payment → `/api/payments/create-order` creates a Razorpay order
4. Razorpay checkout opens on the frontend
5. On success, `/api/payments/verify` validates the payment signature
6. Razorpay **webhook** at `/api/payments/webhook` handles async payment confirmation
7. Project `paymentStatus` is updated to `completed`

---

## 🔧 Admin Panel

Accessible at `/admin/dashboard` — **Admin role required**.

Admin capabilities:
- ✅ Add / Edit / Delete **Services**
- ✅ Upload / Manage **Portfolio Items** (with Cloudinary image upload)
- ✅ View and update **Project Requests** (status: pending → in-progress → completed)
- ✅ View **Contact Form Submissions**

---

## 🌐 Deployment

### Backend (Node.js / Express)
Recommended platforms: **Railway**, **Render**, **AWS EC2**, **DigitalOcean**

```bash
# Production start
npm start
```

### Frontend (Next.js)
Recommended platform: **Vercel**

```bash
# Build for production
npm run build

# Start production server
npm start
```

> **Note:** Make sure all environment variables are configured in your hosting dashboard before deploying.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Rohit Kumar** — Full Stack Developer

- 🐙 GitHub: [github.com/your-username](https://github.com)
- 💼 LinkedIn: [linkedin.com/in/your-profile](https://www.linkedin.com/feed/)
- 📧 Email: your.email@example.com

---

<div align="center">

Made with ❤️ by **Rohit Kumar**

⭐ If you found this project helpful, please give it a star!

</div>
