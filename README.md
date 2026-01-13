# 🍽️ Restaurant Reservation Management System

A full-stack web application for managing restaurant table reservations with role-based access control for customers and administrators.

---

## 🚀 Tech Stack

### Frontend
- **React** (Create React App)
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components and styling
- **Axios** - HTTP client for API calls
- **React Toastify** - User notifications

### Backend (Deployed Separately)
- **Node.js** with **Express**
- **MongoDB** - Database
- **JWT** - Authentication and authorization

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
  - Update any reservation (date, time slot)
- Cancel any reservation
  - Full system visibility
- **Restrictions**: None (full system access)

### Implementation Details

1. **JWT Token Authentication**:
   - Token stored in `localStorage` after successful login
   - Token includes user role information
   - Token is sent with every API request via Axios interceptor

2. **Frontend Route Protection**:
   - `ProtectedRoute`: Checks for valid token (any authenticated user)
   - `AdminRoute`: Checks for ADMIN role specifically
   - Unauthorized users are redirected to login page

3. **Backend Authorization**:
   - API endpoints validate JWT token
   - Role-based middleware checks user permissions
   - Admin-only endpoints verify ADMIN role

4. **API Endpoints by Role**:

   **Customer Endpoints:**
   - `POST /api/auth/register` - Register new user
   - `POST /api/auth/login` - Login
   - `POST /api/reservations` - Create reservation
   - `GET /api/reservations/my` - Get own reservations
   - `DELETE /api/reservations/:id` - Cancel own reservation

   **Admin Endpoints:**
   - All customer endpoints
   - `GET /api/reservations/all` - Get all reservations
   - `GET /api/reservations/by-date?date=YYYY-MM-DD` - Filter by date
   - `PUT /api/reservations/admin/:id` - Update any reservation
   - `DELETE /api/reservations/admin/:id` - Cancel any reservation


---

## ⚙️ Environment Variables

Create `.env` file:

REACT_APP_API_URL=http://localhost:5000/api

---

## ▶️ Run the App

npm install  
npm start

App runs on http://localhost:3000


