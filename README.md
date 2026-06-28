# AgroMart / FarmerApp Frontend

A modern React + Vite frontend for a farm-to-market platform that connects farmers directly with buyers and consumers. The app supports two user roles — **Farmer** and **Buyer** — with role-based dashboards, product management, order tracking, and a public marketing website.

## Live Purpose

This project is designed to:

- help farmers list and manage produce
- let buyers browse products and place orders
- provide a clean public landing site for visitors
- support secure login, registration, and profile management

## Tech Stack

- **React 19**
- **Vite**
- **React Router DOM**
- **Axios** / Fetch API
- **React Icons**
- **Lucide React**
- **Three.js**
- **CSS Modules / custom CSS files**

## Features

### Public Website

- Home page with hero section and product highlights
- About section describing the platform mission
- Features section showcasing platform benefits
- Contact page and contact form
- AI chatbot entry point on the homepage

### Authentication

- User registration
- Login with JWT token handling
- Forgot password flow
- Profile page
- Role-based redirect after login

### Farmer Features

- Farmer dashboard layout with protected routes
- Add new products with image upload and multi-step form
- Edit existing products
- View all own products
- View product details
- Delete products
- Earnings dashboard
- Orders management

### Buyer Features

- Buyer dashboard layout with protected routes
- Browse products
- Cart and order-related flows
- Receipt / order confirmation page

## Project Structure

```bash
src/
├── App.jsx
├── Auth_page/
├── Components/
├── Layouts/
├── Pages/
│   ├── Home_pages/
│   ├── Farmer_pages/
│   └── Buyer_pages/
├── assets/
└── config.js
```

## Available Scripts

From `package.json`:

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Devkaran-Patidar/FarmerApp-Frontend.git
cd FarmerApp-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment / API

Make sure the frontend API configuration points to your backend server. The app uses `API_URL` from `src/config`.

If your project uses environment variables, create a `.env` file and update the backend URL accordingly.

### 4. Run the app

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Authentication Flow

- Users register as either **farmer** or **buyer**
- Login stores access and refresh tokens in `localStorage`
- Role is stored in `localStorage` for route protection and redirects
- Farmer routes and buyer routes are protected by their respective layouts

## Backend Integration

This frontend expects a backend API with endpoints for:

- user registration and login
- profile data
- farmer products and earnings
- farmer orders
- buyer product browsing and ordering

If the backend is running separately, make sure CORS and API URLs are configured correctly.

## Notes

- This repository is a frontend-only project.
- Some route names and UI labels use the **AgroMart** brand in the existing codebase.
- Product, order, and profile data are fetched from the backend API.

## Screenshots

Add screenshots here if available:

- Homepage
- Farmer dashboard
- Buyer dashboard
- Product details
- Add product flow

## License

No license file is currently included in the repository.

---

Built for connecting farmers directly with buyers and reducing middlemen in the supply chain.
