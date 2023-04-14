import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  let nav = useNavigate()
  const toLogin = () => {
    nav(`../login`)
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? <div>{user.username}
            <button className="navButton">sign out</button>
        </div> : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={toLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
