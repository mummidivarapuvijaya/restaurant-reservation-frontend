import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
  e.preventDefault();
  try {
    await api.post("/auth/register", form);
    toast.success("Registration successful. Please login.");
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <>
    <Header />
    <div className="auth-container">
    <form className="auth-form" onSubmit={register}>
    <h2>Register</h2>

    <input name="name" placeholder="Name" onChange={handleChange} required />
    <input name="email" placeholder="Email" onChange={handleChange} required />
    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
      required
    />

    <select name="role" onChange={handleChange}>
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>

    <button type="submit">Register</button>

    <p>
      Already have account? <a href="/login">Login</a>
    </p>
  </form>
</div>
</>
  );
}
