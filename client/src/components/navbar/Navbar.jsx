import {
  faHouse
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const { user ,dispatch} = useContext(AuthContext);
  let nav = useNavigate()
  const toLogin = () => {
    nav(`../login`)
  }
  const toRegister = ()=>{
    nav(`../register`)
  }
  const logOut =()=>{
    dispatch({type:"LOGOUT"})
    window.localStorage.clear()
    nav(`../`)
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <FontAwesomeIcon icon={faHouse} className="NavIcon" />
          <span className="logo"> HouseHub.com</span>
        </Link>
        {user ? <div>{user.username}
            <button className="navButton" onClick={logOut}>sign out</button>
        </div> : (
          <div className="navItems">
            <button className="navButton" onClick={toRegister}>Register</button>
            <button className="navButton" onClick={toLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
