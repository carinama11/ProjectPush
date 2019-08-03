import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="banner-navbar">
      <div className="banner-icon">
        <h2>ICON</h2>
      </div>
      <ul className="navbar-list">
        <Link to="/" className="link">
          <li>Home</li>
        </Link>
        <Link to="/shops" className="link">
          <li>Shops</li>
        </Link>
        <Link to="/weapons" className="link">
          <li>Weapons</li>
        </Link>
        <a
          href="https://www.epicgames.com/fortnite/en-US/home"
          target="_blank"
          rel="noopener noreferrer"
          className="fortnite-wrapper"
        >
          <li className="play-fortnite">PLAY FORTNITE</li>
        </a>
      </ul>
    </div>
  );
}

export default Navbar;
