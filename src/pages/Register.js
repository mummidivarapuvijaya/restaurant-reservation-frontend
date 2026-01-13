import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
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
    <div className="register-page">
      <Header />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row w-100 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <Card className="shadow-lg border-0 register-card">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold">Register</h2>
                <Form onSubmit={register}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
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
                    Register
                  </Button>
                  <p className="text-center mt-3">
                    Already have account?{" "}
                    <Link to="/login" className="text-decoration-none fw-bold">
                      Login
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
