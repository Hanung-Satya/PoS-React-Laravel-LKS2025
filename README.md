---

# 🧾 PoS React + Laravel (LKS 2025)

A web-based **Point of Sale (PoS)** system built using **React (Vite)** as the frontend and **Laravel 12 + Sanctum** as the backend API.
This project is designed as a modern cashier application simulation for the **LKS Web Technologies 2025** competition.

---

## 🚀 Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router DOM
* Tailwind CSS

### Backend

* Laravel 12
* Laravel Sanctum (SPA Authentication)
* MySQL
* REST API

---

## 📁 Project Structure

```
PoS-React-Laravel-LKS2025/
│
├── backend/   → Laravel 12 API + Sanctum
└── frontend/  → React (Vite) SPA
```

---

## 🔐 Authentication Flow

This project uses **Laravel Sanctum SPA Authentication** (session-based, not JWT).

Login flow:

1. React requests CSRF cookie from `/sanctum/csrf-cookie`
2. React sends login data to `/api/login`
3. Laravel creates a session cookie
4. All protected routes use `auth:sanctum` middleware

---

## ⚙️ How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/Hanung-Satya/PoS-React-Laravel-LKS2025.git
cd PoS-React-Laravel-LKS2025
```

---

# 🖥 Backend Setup (Laravel 12)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit database configuration in `.env`:

```env
DB_DATABASE=pos_lks
DB_USERNAME=root
DB_PASSWORD=
```

Then run:

```bash
php artisan migrate
php artisan serve
```

Backend runs at:

```
http://localhost:8000
```

---

# 💻 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🌐 Sanctum & CORS Configuration (IMPORTANT)

Make sure backend configuration:

### `.env`

```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### `config/cors.php`

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

---

## 📌 Main Features

* Login & Logout with Sanctum
* Cashier Dashboard
* Product Management
* Product Categories
* Sales Transactions
* Shopping Cart
* Sales Reports
* Admin Role Management

---

## 🎯 Project Purpose

* Fullstack practice using React & Laravel
* Simulating a modern POS system
* Preparation for LKS Web Technologies competition
* Implementing professional SPA authentication with Sanctum

---

## 👨‍💻 Developer

* **Hanung Satya Adi Wicaksono**
* SMK Negeri 2 Surakarta
* Major: Software Engineering (PPLG)

---

## 📜 License

This project is created for learning and competition purposes.

---
