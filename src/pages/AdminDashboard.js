import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    timeSlot: ""
  });

  // Load all reservations
  const loadReservations = async () => {
    const res = await api.get("/api/reservations/all");
    setReservations(res.data);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // Filter by date
  const filterByDate = async () => {
    if (!date) return;
    const res = await api.get(`/api/reservations/by-date?date=${date}`);
    setReservations(res.data);
  };

  // Reset filter
  const resetFilter = () => {
    setDate("");
    loadReservations();
  };

  // Start editing
  const startEdit = (reservation) => {
    setEditingId(reservation._id);
    setEditData({
      date: reservation.date,
      timeSlot: reservation.timeSlot
    });
  };

  // Save update
const saveUpdate = async (id) => {
  await api.put(`/api/reservations/admin/${id}`, editData);
  toast.success("Reservation updated");
  setEditingId(null);
  loadReservations();
};

  // Cancel reservation
 const cancelReservation = async (id) => {
  await api.delete(`/api/reservations/admin/${id}`);
  toast.info("Reservation cancelled");
  loadReservations();
};


  // Logout
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="header">
        <h2>Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button  className="action-btn" onClick={filterByDate}>Filter by Date</button>
        <button onClick={resetFilter}>Reset</button>
      </div>

      {/* Table */}
      {reservations.length === 0 ? (
        <div className="empty">No reservations found</div>
      ) : (
        <table>
          <thead>
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
                <td>{r.user?.email}</td>

                <td>
                  {editingId === r._id ? (
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                    />
                  ) : (
                    r.date
                  )}
                </td>

                <td>
                  {editingId === r._id ? (
                    <input
                      type="text"
                      value={editData.timeSlot}
                      onChange={(e) =>
                        setEditData({ ...editData, timeSlot: e.target.value })
                      }
                    />
                  ) : (
                    r.timeSlot
                  )}
                </td>

                <td>{r.guests}</td>
                <td>{r.table?.tableNumber}</td>

                <td>
                  {editingId === r._id ? (
                    <button  className="action-btn" onClick={() => saveUpdate(r._id)}>Save</button>
                  ) : (
                    <button  className="action-btn" onClick={() => startEdit(r)}>Update</button>
                  )}
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
