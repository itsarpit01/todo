import { useState, useEffect } from "react";

const usersPerPage = 10;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
const [error, setError] = useState("");

useEffect(() => {
  async function fetchUsers() {
    setLoading(true);
    setError("");

    const skip = (page - 1) * usersPerPage;

    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${usersPerPage}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching users");
      }

      const data = await response.json();

      setUsers(data?.users ?? []);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchUsers();
}, [page]);

const totalPages = Math.ceil(total / usersPerPage);

  function goToPreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function goToNextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="users-container">
      <h1>Users</h1>

      {loading ? (
        <p className="empty-text">Loading users...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="user-avatar"
                    />
                  </td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td className="no-wrap">{user.phone}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="input-row">
            <button onClick={goToPreviousPage} className="edit-button">
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>
            <button onClick={goToNextPage} className="edit-button">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}