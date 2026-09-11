import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserById } from "../api/userApi";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchUserById(id);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id]);

  if (loading) return <p className="empty-text">Loading user...</p>;
  if (error) return <p className="empty-text">{error}</p>;

  return (
    <div className="todo-container">
      <h1>User Details</h1>
      <Link to="/users" className="edit-button">Back to Users</Link>

      <div className="task-item" style={{ flexDirection: "column", alignItems: "flex-start", marginTop: "20px" }}>
        <img src={user.image} alt={user.firstName} className="user-avatar" style={{ width: "80px", height: "80px", marginBottom: "12px" }} />
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>

      <Link to={`/users/${id}/edit`} className="edit-button" style={{ display: "inline-block", marginTop: "16px" }}>
        Edit This User
      </Link>
    </div>
  );
}