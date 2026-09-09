import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About-us";
import Todo from "../pages/Todo";
import Users from "../pages/User";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}