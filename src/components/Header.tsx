import { Navbar, Container } from "react-bootstrap";
import "./Header.css";

export default function Header() {
  return (
    <Navbar expand="lg" className="custom-navbar shadow-lg">
      <Container fluid>
        <Navbar.Brand className="mx-auto brand-text">
          <span className="brand-icon">🍽️</span>
          <span className="brand-title">Restaurant Reservation Management System</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
