export async function fetchUsers(page, usersPerPage) {
  const skip = (page - 1) * usersPerPage;
  const response = await fetch(`https://dummyjson.com/users?limit=${usersPerPage}&skip=${skip}`);
  if (!response.ok) throw new Error("Something went wrong while fetching users");
  return await response.json();
}

export async function fetchUserById(id) {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  if (!response.ok) throw new Error("Could not find this user");
  return await response.json();
}

export async function addUser(userData) {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Something went wrong while adding the user");
  return await response.json();
}

export async function updateUser(id, userData) {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Something went wrong while updating the user");
  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`https://dummyjson.com/users/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Something went wrong while deleting the user");
  return await response.json();
}