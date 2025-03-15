import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src="/logo.png" alt="logo" /> */}
        <h1 style={{ fontWeight: "900", fontSize: "2rem", letterSpacing: "1px" }}>
        <span style={{ color: "#0056b3" }}>Job</span>
        <span style={{ color: "#d84315" }}>Genius</span>
        </h1>


      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/jobs">JOBS</Link>
          </li>
          <li>
            <Link to="/dashboard">DASHBOARD</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        </ul>
      </div>
      <GiHamburgerMenu className="hamburger" />
    </nav>
  );
};

export default Navbar;
