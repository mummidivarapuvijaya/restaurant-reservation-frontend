import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Header />
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <h1 className="display-1 fw-bold text-white mb-3">404</h1>
        <h2 className="display-4 text-white mb-3">Page Not Found</h2>
        <p className="lead text-white mb-4">
          The page you are looking for does not exist.
        </p>
        <Button variant="light" size="lg" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Container>
    </div>
  );
}
