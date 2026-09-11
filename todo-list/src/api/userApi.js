
export async function fetchUsers(page, usersPerPage) {
  const skip = (page - 1) * usersPerPage;

  const response = await fetch(
    `https://dummyjson.com/users?limit=${usersPerPage}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong while fetching users");
  }

  const data = await response.json();

  return data;
}