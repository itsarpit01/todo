import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About-us";
import Todo from "../pages/Todo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}