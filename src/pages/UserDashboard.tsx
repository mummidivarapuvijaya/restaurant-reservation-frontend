import Header from "../components/Header";
import { Container, Card, Form, Button, Table, Carousel } from "react-bootstrap";
import "./UserDashboard.css";
import { useMyReservations, useCreateReservation, useCancelReservation } from "../api/queries";
import { reservationFormSchema, ReservationForm } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function UserDashboard() {
  const { data: reservations = [], isLoading } = useMyReservations();
  const createReservation = useCreateReservation();
  const cancelReservation = useCancelReservation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      date: "",
      timeSlot: "",
      guests: 1,
    },
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const onSubmit = async (data: ReservationForm) => {
    createReservation.mutate(data, {
      onSuccess: () => {
        reset({
          date: "",
          timeSlot: "",
          guests: 1,
        });
      },
    });
  };

  const handleCancel = (id: string) => {
    cancelReservation.mutate(id);
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("date")}
                        className="form-control-lg"
                        isInvalid={!!errors.date}
                      />
                      {errors.date && (
                        <Form.Control.Feedback type="invalid">
                          {errors.date.message}
                        </Form.Control.Feedback>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("timeSlot")}
                        placeholder="7PM - 9PM"
                        className="form-control-lg"
                        isInvalid={!!errors.timeSlot}
                      />
                      {errors.timeSlot && (
                        <Form.Control.Feedback type="invalid">
                          {errors.timeSlot.message}
                        </Form.Control.Feedback>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <Form.Label>Number of Guests</Form.Label>
                      <Form.Control
                        type="number"
                        {...register("guests", { valueAsNumber: true })}
                        min="1"
                        max="20"
                        className="form-control-lg"
                        isInvalid={!!errors.guests}
                      />
                      {errors.guests && (
                        <Form.Control.Feedback type="invalid">
                          {errors.guests.message}
                        </Form.Control.Feedback>
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="book-btn"
                    disabled={createReservation.isPending}
                  >
                    {createReservation.isPending ? "Booking..." : "✨ Book Reservation"}
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
            {isLoading ? (
              <div className="text-center py-5">
                <p className="lead text-muted">Loading reservations...</p>
              </div>
            ) : reservations.length === 0 ? (
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
                            onClick={() => handleCancel(r._id)}
                            className="action-btn-cancel"
                            disabled={cancelReservation.isPending}
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
