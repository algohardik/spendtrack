import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">SpendTrack</Link>

        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/expenses">Expenses</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
