import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">To~Do</h2>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/todo">Todo</NavLink>
      <NavLink to="/about">About Us</NavLink>
    </div>
  );
}