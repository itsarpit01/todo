import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sidebar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About Us</NavLink>
      <NavLink to="/todo">Todo</NavLink>
      <NavLink to="/users">Users</NavLink>
    </div>
  );
}