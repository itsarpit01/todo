import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/Aboutus";
import Todo from "../pages/Todo";
import Users from "../pages/User";
import AppLayout from "./AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route element={<AppLayout />}>
        <Route path="/todo" element={<Todo />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}