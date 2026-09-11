import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/Aboutus";
import Todo from "../pages/Todo";
import Users from "../pages/User";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";
import AppLayout from "../layouts/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
      </Route>
    </Routes>
  );
}