import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/todo">Todo</Link>
      <Link to="/about">About Us</Link>
    </nav>
  );
}