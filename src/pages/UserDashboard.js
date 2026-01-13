import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { Container, Card, Form, Button, Table, Carousel } from "react-bootstrap";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    date: "",
    timeSlot: "",
    guests: 1
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const loadReservations = async () => {
    try {
      const res = await api.get("/reservations/my");
      setReservations(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load reservations");
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookReservation = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservations", form);
      toast.success("Reservation booked successfully");

      setForm({
        date: "",
        timeSlot: "",
        guests: 1
      });

      loadReservations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  const cancelReservation = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      toast.info("Reservation cancelled");
      loadReservations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel reservation");
    }
  };

  return (
    <div className="user-dashboard-page">
      <Header />
      <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row mb-4">
          <div className="col-12">
            <Carousel fade className="dashboard-carousel">
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">📅</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">Welcome to Your Dashboard</h2>
                  <p className="lead text-white fs-4">Manage your reservations with ease</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">🍽️</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">Book Your Perfect Table</h2>
                  <p className="lead text-white fs-4">Experience fine dining at its finest</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">✅</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">Track Your Reservations</h2>
                  <p className="lead text-white fs-4">Stay updated with all your bookings</p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <Card className="shadow-lg border-0 mb-4 user-main-card">
          <Card.Header className="d-flex justify-content-between align-items-center user-header">
            <h3 className="mb-0 text-white fw-bold">👤 User Dashboard</h3>
            <Button variant="outline-light" onClick={logout} className="logout-btn">
              Logout
            </Button>
          </Card.Header>
          <Card.Body className="p-4">
            <Card className="mb-4 booking-card">
              <Card.Header className="booking-header">
                <h5 className="mb-0 text-white fw-bold">📅 Book a Reservation</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={bookReservation}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Control
                        type="text"
                        name="timeSlot"
                        placeholder="7PM - 9PM"
                        value={form.timeSlot}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Label>Number of Guests</Form.Label>
                      <Form.Control
                        type="number"
                        name="guests"
                        min="1"
                        value={form.guests}
                        onChange={handleChange}
                        required
                        className="form-control-lg"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="book-btn">
                    ✨ Book Reservation
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 fw-bold text-dark">📋 My Reservations</h4>
              <span className="badge reservation-badge fs-6 px-3 py-2">
                Total: {reservations.length}
              </span>
            </div>
            {reservations.length === 0 ? (
              <div className="text-center py-5">
                <p className="lead text-muted">No reservations yet</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover className="table-custom">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Guests</th>
                      <th>Table</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r._id}>
                        <td>{r.date}</td>
                        <td>{r.timeSlot}</td>
                        <td>{r.guests}</td>
                        <td>{r.table?.tableNumber || "N/A"}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => cancelReservation(r._id)}
                            className="action-btn-cancel"
                          >
                            🗑️ Cancel
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
