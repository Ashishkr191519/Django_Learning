# 💸 ExpenseFlow — Smart Personal Finance Tracker

A modern, full-stack personal finance management application built with **Django REST Framework, React, Redux Toolkit, and PostgreSQL**.

ExpenseFlow helps users manage their income, expenses, budgets, and financial activity through an interactive dashboard, insightful analytics, and a secure authentication system.

### 🌐 Live Demo

**[Launch ExpenseFlow](https://expenseflow-app-kohl.vercel.app)**

**Backend API:** https://expenseflow-backend.vercel.app

---

## ✨ Features

### 🔐 Authentication & Security
- User registration and login
- JWT authentication using HttpOnly cookies
- Access and refresh token management
- Automatic token refresh using Axios interceptors
- CSRF protection for authenticated requests
- Protected routes and persistent authentication
- Secure logout functionality

### 💰 Transaction Management
- Add income and expense transactions
- View transaction history
- Edit and delete transactions
- Search and filter transactions
- Organize transactions by categories
- Track financial activity in real time

### 📊 Interactive Dashboard
- Total income, expenses, and balance
- Dynamic financial summary cards
- Cash flow visualization
- Category-wise spending charts
- Recent transactions overview
- Responsive dashboard interface

### 📈 Financial Analytics
- Income and expense analysis
- Financial trends and visualizations
- Category-based expense insights
- Interactive charts powered by Recharts

### 🎯 Budget Management
- Create and manage budgets
- Track budget allocations
- Monitor spending against budgets

### 📱 User Experience
- Modern, responsive user interface
- Dark-themed financial dashboard
- Mobile-friendly design
- Reusable React components
- Client-side routing

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| State Management | Redux Toolkit |
| API Communication | Axios |
| Charts | Recharts |
| Backend | Python, Django, Django REST Framework |
| Database | PostgreSQL |
| Authentication | JWT, HttpOnly Cookies, CSRF |
| Frontend Hosting | Vercel |
| Backend Hosting | Vercel |
| Cloud Database | Supabase |
| Version Control | Git, GitHub |

---

## 🏗️ System Architecture

```text
                  USER / BROWSER
                         |
                         v
               React + Vite Frontend
                  (Vercel Hosting)
                         |
                         v
                 Redux Toolkit
                         |
                         v
                  Axios Client
                         |
                   HTTPS Requests
                         |
                         v
              Django REST Framework
                  (Vercel Hosting)
                         |
                 JWT Authentication
                  + CSRF Protection
                         |
                         v
                 PostgreSQL Database
                     (Supabase)
```

### How It Works

1. Users interact with the React frontend.
2. Axios sends API requests to the Django backend.
3. Django REST Framework validates requests and handles business logic.
4. JWT authentication protects private endpoints.
5. PostgreSQL stores user, transaction, category, and budget data.
6. Redux Toolkit manages frontend application state.
7. Recharts visualizes financial information.

---

## 📂 Project Structure

```text
expense_tracker/
│
├── backend/
│   ├── accounts/
│   │   ├── authentication.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── expenses/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── api/
│   │   └── index.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── router/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run ExpenseFlow locally.

### Prerequisites

Ensure you have installed:

- Python
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ashishkr191519/Django_Learning.git

cd Django_Learning/expense_tracker
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

**macOS / Linux**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory.

```dotenv
DJANGO_SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=expenseflow
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_SSLMODE=prefer

CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173
```

Replace the example database values with your local PostgreSQL credentials.

Generate a Django secret key:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Run Database Migrations

Create the PostgreSQL database specified in your `.env` file, then run:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend runs at:

`http://localhost:8000`

### 5. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd expense_tracker/frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

---

## 🔌 Authentication API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/csrf/` | Get CSRF token |
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Authenticate user |
| POST | `/api/auth/refresh/` | Refresh access token |
| GET | `/api/auth/me/` | Retrieve current user |
| POST | `/api/auth/logout/` | Logout user |

### Authentication Flow

```text
User Login
    |
    v
Django validates credentials
    |
    v
JWT access + refresh tokens generated
    |
    v
Tokens stored in HttpOnly cookies
    |
    v
Authenticated API requests
    |
    v
Access token expires
    |
    v
Axios refresh interceptor
    |
    v
Refresh endpoint issues new access token
    |
    v
Original request retried
```

This approach keeps JWT tokens out of JavaScript-accessible storage.

---

## ☁️ Deployment

ExpenseFlow uses separate frontend and backend deployments.

### Frontend — Vercel

- Framework: Vite
- Root Directory: `expense_tracker/frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Production environment variable:

```dotenv
VITE_API_URL=https://expenseflow-backend.vercel.app/api
```

### Backend — Vercel

- Framework: Django
- Root Directory: `expense_tracker/backend`
- Production environment variables configured securely in Vercel

### Database — Supabase

- Managed PostgreSQL
- SSL-encrypted database connections
- Django ORM for database operations
- Django migrations for schema management

Database credentials are stored in server-side environment variables and are never exposed to the frontend.

---

## 🔒 Security Considerations

ExpenseFlow implements several security practices:

- HttpOnly cookies for JWT storage
- Secure cookies in production
- CSRF validation for protected requests
- Configurable CORS trusted origins
- Password hashing through Django's authentication system
- Environment-based secret management
- Protected backend endpoints
- HTTPS for production communication

**Note:** Cross-origin cookie authentication depends on browser cookie policies and production domain configuration.

Never commit `.env` files, database passwords, or secret keys to version control.

---

## 🔮 Future Improvements

- AI-powered expense insights
- Intelligent spending recommendations
- Monthly financial reports
- Transaction export to CSV/PDF
- Recurring transaction support
- Email notifications
- Financial forecasting

---

## 👨‍💻 Developer

**Ashish Kumar**

Full-Stack Development | Python | Django | React | PostgreSQL

**GitHub:** [Ashishkr191519](https://github.com/Ashishkr191519)

---

## ⭐ Support

If you find this project useful, consider giving the repository a star.

**Built with Django, React, and PostgreSQL.**