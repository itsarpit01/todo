import axiosClient from "./axiosClient";

export async function fetchUsers(page, usersPerPage, search = "") {
  const skip = (page - 1) * usersPerPage;
  let url = `/users?limit=${usersPerPage}&skip=${skip}`;

  if (search.trim() !== "") {
    url = `/users/search?q=${search}&limit=${usersPerPage}&skip=${skip}`;
  }

  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (err) {
    throw new Error("Something went wrong while fetching users");
  }
}

export async function fetchUserById(id) {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Could not find this user");
  }
}

export async function addUser(userData) {
  try {
    const response = await axiosClient.post("/users/add", userData);
    return response.data;
  } catch (err) {
    throw new Error("Something went wrong while adding the user");
  }
}

export async function updateUser(id, userData) {
  try {
    const response = await axiosClient.patch(`/users/${id}`, userData);
    return response.data;
  } catch (err) {
    throw new Error("Something went wrong while updating the user");
  }
}

export async function deleteUser(id) {
  try {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("Something went wrong while deleting the user");
  }
}