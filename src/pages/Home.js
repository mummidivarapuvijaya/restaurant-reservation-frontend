import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Carousel } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
        {/* Hero Section */}
        <div className="hero-section text-center mb-5">
          <h1 className="display-2 fw-bold text-white mb-4 hero-title">
            Welcome to Our Restaurant
          </h1>
          <p className="lead fs-3 text-white mb-5 hero-subtitle">
            Experience fine dining at its best. Reserve your table today!
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button
              variant="light"
              size="lg"
              className="hero-btn px-5 py-3"
              onClick={() => navigate("/login")}
            >
              <span className="me-2">🔐</span> Login
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              className="hero-btn px-5 py-3"
              onClick={() => navigate("/register")}
            >
              <span className="me-2">✨</span> Register
            </Button>
          </div>
        </div>

        {/* Features Carousel */}
        <div className="row w-100 mb-5">
          <div className="col-12">
            <Carousel fade className="features-carousel">
              <Carousel.Item>
                <Card className="feature-card">
                  <Card.Body className="text-center p-5">
                    <div className="feature-icon mb-4">🍽️</div>
                    <h3 className="mb-3">Fine Dining Experience</h3>
                    <p className="lead">
                      Enjoy exquisite cuisine in an elegant atmosphere
                    </p>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="feature-card">
                  <Card.Body className="text-center p-5">
                    <div className="feature-icon mb-4">📅</div>
                    <h3 className="mb-3">Easy Reservations</h3>
                    <p className="lead">
                      Book your table in just a few clicks
                    </p>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="feature-card">
                  <Card.Body className="text-center p-5">
                    <div className="feature-icon mb-4">⭐</div>
                    <h3 className="mb-3">Premium Service</h3>
                    <p className="lead">
                      Experience world-class hospitality and service
                    </p>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="row w-100">
          <div className="col-md-4 mb-4 mb-md-0">
            <Card className="info-card h-100">
              <Card.Body className="text-center p-4">
                <div className="info-icon mb-3">🕐</div>
                <h5 className="mb-2">Open Hours</h5>
                <p className="mb-0">Mon-Sun: 11 AM - 11 PM</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <Card className="info-card h-100">
              <Card.Body className="text-center p-4">
                <div className="info-icon mb-3">📍</div>
                <h5 className="mb-2">Location</h5>
                <p className="mb-0">Downtown City Center</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="info-card h-100">
              <Card.Body className="text-center p-4">
                <div className="info-icon mb-3">📞</div>
                <h5 className="mb-2">Contact</h5>
                <p className="mb-0">+1 (555) 123-4567</p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
