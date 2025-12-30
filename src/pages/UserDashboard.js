import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { toast } from "react-toastify";

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
    const res = await api.get("/reservations/my");
    setReservations(res.data);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const bookReservation = async (e) => {
  e.preventDefault();
  try {
    await api.post("/reservations", form);
    toast.success("Reservation booked successfully");
    loadReservations();
  } catch (err) {
    toast.error(err.response?.data?.message || "Booking failed");
  }
};

const cancelReservation = async (id) => {
  await api.delete(`/reservations/${id}`);
  toast.info("Reservation cancelled");
  loadReservations();
};


  return (
    <>
    <Header />
    <div className="container">
      <div className="header">
        <h2>User Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>Book a Reservation</h3>
      <form onSubmit={bookReservation}>
        <input type="date" name="date" onChange={handleChange} required />
        <input
          type="text"
          name="timeSlot"
          placeholder="7PM - 9PM"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="guests"
          min="1"
          onChange={handleChange}
          required
        />
        <button type="submit">Book</button>
      </form>

      <h3>My Reservations</h3>
      {reservations.length === 0 ? (
        <div className="empty">No reservations yet</div>
      ) : (
        <table>
          <thead>
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
                <td>{r.table?.tableNumber}</td>
                <td>
                  <button onClick={() => cancelReservation(r._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}
