# 🍽️ Restaurant Reservation Management System – Frontend

This is the **frontend application** for the Restaurant Reservation Management System, built using **React**.  
It provides role-based user interfaces for **Customers (Users)** and **Administrators (Admins)** to manage restaurant reservations.

---

## 🚀 Tech Stack

- React (Create React App)
- React Router DOM
- Axios
- React Toastify
- CSS

---

## 🔐 Authentication & Authorization

- JWT token stored in localStorage
- Axios interceptor attaches token automatically
- Role-based routing (User/Admin)

---

## 👤 User Features

- Register & login
- Book reservation
- View own reservations
- Cancel reservation
- Toast notifications

---

## 🛠️ Admin Features

- View all reservations
- Filter reservations by date
- Update reservation details
- Cancel any reservation

---

## 🔔 Notifications

Uses **react-toastify** for non-blocking alerts.

---

## ⚙️ Environment Variables

Create `.env` file:

REACT_APP_API_URL=http://localhost:5000/api

---

## ▶️ Run the App

npm install  
npm start

App runs on http://localhost:3000


