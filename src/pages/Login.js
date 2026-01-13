import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful");

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <Header />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row w-100 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <Card className="shadow-lg border-0 login-card">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold">Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                  >
                    Login
                  </Button>
                  <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none fw-bold">
                      Register
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
