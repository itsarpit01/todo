import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/Aboutus";
import Todo from "../pages/Todo";
import Users from "../pages/User";
import AppLayout from "../layouts/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}