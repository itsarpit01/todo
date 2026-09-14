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

  const addressText =
    typeof user.address === "string" ? user.address : user.address?.address;

  return (
    <div className="todo-container">
      <h1>User Details</h1>
      <Link to="/users" className="edit-button">Back to Users</Link>

      <div className="task-item user-details-box">
        <img
          src={user.image || "https://via.placeholder.com/80"}
          alt={user.firstName}
          className="user-avatar user-details-avatar"
        />
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {addressText || "Not provided"}</p>
      </div>

      <Link to={`/users/${id}/edit`} className="edit-button user-details-edit-link">
        Edit This User
      </Link>
    </div>
  );
}