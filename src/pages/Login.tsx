import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useLogin } from "../api/queries";
import { loginSchema, LoginForm } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    loginMutation.mutate(data, {
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
    <div className="login-page">
      <Header />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row w-100 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <Card className="shadow-lg border-0 login-card">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold">Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
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
