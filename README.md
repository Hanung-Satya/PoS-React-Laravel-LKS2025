---

# 🧾 PoS React + Laravel (LKS 2025)

Sistem **Point of Sale (PoS)** berbasis web yang dibangun menggunakan **React (Vite)** sebagai frontend dan **Laravel 12 + Sanctum** sebagai backend API.
Project ini dirancang sebagai simulasi aplikasi kasir modern untuk kebutuhan kompetisi **LKS Web Technologies 2025**.

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

## 📁 Struktur Project

```
PoS-React-Laravel-LKS2025/
│
├── backend/   → Laravel 12 API + Sanctum
└── frontend/  → React (Vite) SPA
```

---

## 🔐 Authentication Flow

Project ini menggunakan **Laravel Sanctum SPA Authentication** (session-based, bukan JWT).

Alur login:

1. React request CSRF cookie dari `/sanctum/csrf-cookie`
2. React kirim login ke `/api/login`
3. Laravel membuat session cookie
4. Semua request dilindungi middleware `auth:sanctum`

---

## ⚙️ Cara Menjalankan Project

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

Edit `.env` database:

```env
DB_DATABASE=pos_lks
DB_USERNAME=root
DB_PASSWORD=
```

Lanjut:

```bash
php artisan migrate
php artisan serve
```

Backend jalan di:

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

Frontend jalan di:

```
http://localhost:5173
```

---

## 🌐 Sanctum & CORS Configuration (WAJIB)

Pastikan di backend:

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

## 📌 Fitur Utama

* Login & Logout (Sanctum)
* Dashboard Kasir
* Manajemen Produk
* Kategori Produk
* Transaksi Penjualan
* Keranjang (Cart)
* Laporan Penjualan
* Role Admin

---

## 🎯 Tujuan Project

* Latihan fullstack React + Laravel
* Simulasi sistem kasir modern
* Persiapan kompetisi LKS Web Technologies
* Implementasi autentikasi SPA profesional menggunakan Sanctum

---

## 👨‍💻 Developer

**Hanung Satya Adi Wicaksono**
SMK Negeri 2 Surakarta
Bidang: Pengembangan Perangkat Lunak dan Gim (PPLG)

---

## 📜 License

Project ini dibuat untuk kebutuhan pembelajaran dan kompetisi.

---
