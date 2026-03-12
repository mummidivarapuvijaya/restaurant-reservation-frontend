import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./Register.css";
import { useRegister } from "../api/queries";
import { registerSchema, RegisterForm } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      },
    });
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name")}
                      placeholder="Enter your name"
                      className="form-control-lg"
                      isInvalid={!!errors.name}
                    />
                    {errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.name.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email"
                      className="form-control-lg"
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password")}
                      placeholder="Enter your password"
                      className="form-control-lg"
                      isInvalid={!!errors.password}
                    />
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registering..." : "Register"}
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
