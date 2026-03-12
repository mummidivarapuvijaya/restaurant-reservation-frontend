import { useState } from "react";
import Header from "../components/Header";
import { Container, Card, Form, Button, Table, Carousel } from "react-bootstrap";
import "./AdminDashboard.css";
import { 
  useAllReservations, 
  useReservationsByDate, 
  useUpdateReservation, 
  useCancelReservationAdmin 
} from "../api/queries";
import { reservationUpdateSchema, ReservationUpdate } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Reservation } from "../schemas";

export default function AdminDashboard() {
  const [filterDate, setFilterDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { data: allReservations = [], isLoading: isLoadingAll } = useAllReservations();
  const { data: filteredReservations = [], isLoading: isLoadingFiltered } = useReservationsByDate(filterDate);
  
  const updateReservation = useUpdateReservation();
  const cancelReservation = useCancelReservationAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationUpdate>({
    resolver: zodResolver(reservationUpdateSchema),
  });

  const reservations = filterDate ? filteredReservations : allReservations;
  const isLoading = filterDate ? isLoadingFiltered : isLoadingAll;

  const filterByDate = () => {
    // Query will run automatically when filterDate changes
  };

  const resetFilter = () => {
    setFilterDate("");
  };

  const startEdit = (reservation: Reservation) => {
    setEditingId(reservation._id);
    reset({
      date: reservation.date,
      timeSlot: reservation.timeSlot,
    });
  };

  const saveUpdate = (id: string) => {
    handleSubmit((data) => {
      updateReservation.mutate(
        { id, data },
        {
          onSuccess: () => {
            setEditingId(null);
          },
        }
      );
    })();
  };

  const handleCancel = (id: string) => {
    cancelReservation.mutate(id);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="admin-dashboard-page">
      <Header />
      <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row mb-4">
          <div className="col-12">
            <Carousel fade className="dashboard-carousel">
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">⚙️</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">Admin Control Panel</h2>
                  <p className="lead text-white fs-4">Manage all reservations efficiently</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">🔍</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">View & Filter Reservations</h2>
                  <p className="lead text-white fs-4">Stay on top of all bookings</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-slide-content">
                  <div className="dashboard-icon mb-3">🎯</div>
                  <h2 className="display-5 text-white mb-3 fw-bold">Update & Manage</h2>
                  <p className="lead text-white fs-4">Full control over reservation system</p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <Card className="shadow-lg border-0 mb-4 admin-main-card">
          <Card.Header className="d-flex justify-content-between align-items-center admin-header">
            <h3 className="mb-0 text-white fw-bold">Admin Dashboard</h3>
            <Button variant="outline-light" onClick={logout} className="logout-btn">
              Logout
            </Button>
          </Card.Header>
          <Card.Body className="p-4">
            {/* Filter Section */}
            <Card className="mb-4 filter-card">
              <Card.Header className="filter-header">
                <h5 className="mb-0 text-white fw-bold">🔍 Filter Reservations</h5>
              </Card.Header>
              <Card.Body>
                <div className="row align-items-end">
                  <div className="col-md-4 mb-3">
                    <Form.Label>Filter by Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="form-control-lg"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={filterByDate}
                      disabled={!filterDate}
                      className="w-100 filter-btn"
                    >
                      Filter by Date
                    </Button>
                  </div>
                  <div className="col-md-4 mb-3">
                    <Button
                      variant="outline-secondary"
                      size="lg"
                      onClick={resetFilter}
                      className="w-100 reset-btn"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Table */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 fw-bold text-dark">📊 All Reservations</h4>
              <span className="badge bg-primary fs-6 px-3 py-2">
                Total: {reservations.length}
              </span>
            </div>
            {isLoading ? (
              <div className="text-center py-5">
                <p className="lead text-muted">Loading reservations...</p>
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-5">
                <p className="lead text-muted">No reservations found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover className="table-custom">
                  <thead className="table-dark">
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Guests</th>
                      <th>Table</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r._id}>
                        <td>{r.user?.email || "N/A"}</td>
                        <td>
                          {editingId === r._id ? (
                            <>
                              <Form.Control
                                type="date"
                                size="sm"
                                {...register("date")}
                                isInvalid={!!errors.date}
                              />
                              {errors.date && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.date.message}
                                </Form.Control.Feedback>
                              )}
                            </>
                          ) : (
                            r.date
                          )}
                        </td>
                        <td>
                          {editingId === r._id ? (
                            <>
                              <Form.Control
                                type="text"
                                size="sm"
                                {...register("timeSlot")}
                                isInvalid={!!errors.timeSlot}
                              />
                              {errors.timeSlot && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.timeSlot.message}
                                </Form.Control.Feedback>
                              )}
                            </>
                          ) : (
                            r.timeSlot
                          )}
                        </td>
                        <td>{r.guests}</td>
                        <td>{r.table?.tableNumber || "N/A"}</td>
                        <td>
                          <div className="d-flex gap-2">
                            {editingId === r._id ? (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => saveUpdate(r._id)}
                                className="action-btn-save"
                                disabled={updateReservation.isPending}
                              >
                                💾 Save
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => startEdit(r)}
                                className="action-btn-update"
                              >
                                ✏️ Update
                              </Button>
                            )}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleCancel(r._id)}
                              className="action-btn-cancel"
                              disabled={cancelReservation.isPending}
                            >
                              🗑️ Cancel
                            </Button>
                          </div>
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
