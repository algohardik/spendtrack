# SpendTrack - Personal Expense Management System

A beginner-friendly full-stack project using:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL
- HTTP client: Axios

## Authentication

This beginner version intentionally has **no JWT, login, registration, or authentication**.

The goal is to make the core full-stack request flow easy to understand:

```text
React
  |
  | Axios HTTP request
  v
Express REST API
  |
  | MySQL query
  v
MySQL
```

## Features

- Dashboard with total expenses
- Total amount spent
- Average expense
- Spending by category
- Add expense
- Edit expense
- Delete expense
- Filter by category

## Project structure

```text
SpendTrack/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── expenseRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── schema.sql
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Expenses.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── README.md
```

## Requirements

Install:

1. Node.js
2. MySQL
3. MySQL Workbench (optional)

## 1. Create database

Run `backend/schema.sql` in MySQL.

It creates:

```text
spendtrack
└── expenses
```

## 2. Configure backend

Copy:

`backend/.env.example`

to:

`backend/.env`

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=spendtrack
```

## 3. Run backend

```bash
cd backend
npm install
npm run dev
```

Backend:

http://localhost:5000

Health check:

http://localhost:5000/api/health

## 4. Run frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally:

http://localhost:5173

## API endpoints

```text
GET    /api/health
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
GET    /api/dashboard
```



```
