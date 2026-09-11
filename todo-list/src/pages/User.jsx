import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../api/userApi";

const usersPerPage = 10;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchUsers(page, usersPerPage);
        setUsers(data?.users ?? []);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [page]);

  const totalPages = Math.ceil(total / usersPerPage);

  function goToFirstPage() { setPage(1); }
  function goToLastPage() { setPage(totalPages); }
  function goToPreviousPage() { if (page > 1) setPage(page - 1); }
  function goToNextPage() { if (page < totalPages) setPage(page + 1); }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="users-container">
      <h1>Users</h1>

      <Link to="/users/add" className="add-button" style={{ display: "inline-block", marginBottom: "16px" }}>
        Add User
      </Link>

      {loading ? (
        <p className="empty-text">Loading users...</p>
      ) : error ? (
        <p className="empty-text">{error}</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>Photo</th><th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><img src={user.image} alt={user.firstName} className="user-avatar" /></td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td className="no-wrap">{user.phone}</td>
                  <td>{user.age}</td>
                  <td className="no-wrap">
                    <Link to={`/users/${user.id}`} className="edit-button">View</Link>
                    <Link to={`/users/${user.id}/edit`} className="edit-button">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="input-row">
            <button onClick={goToFirstPage} className="edit-button">First</button>
            <button onClick={goToPreviousPage} className="edit-button">Previous</button>
            <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
            <button onClick={goToNextPage} className="edit-button">Next</button>
            <button onClick={goToLastPage} className="edit-button">Last</button>
          </div>
        </>
      )}
    </div>
  );
}