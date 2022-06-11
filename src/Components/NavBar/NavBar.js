import "./NavBar.css";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  return (
    <div>
      <nav className="autohide navbar navbar-expand-lg navbar-white bg-transparent">
        <div className="container-fluid">
          <img
            className="navbar-logo"
            alt="nav-logo"
            src="http://192.168.0.116:8080/images/logo_small.png"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
          >
            <span className="navbar-toggler-icon">
              <GiHamburgerMenu />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link navbar-custom" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link navbar-custom" to="/#aboutdiv">
                  ABOUT
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link navbar-custom" to="/#features">
                  FEATURES
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link navbar-custom" to="/#screens">
                  SCREENS
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link navbar-custom" to="/#download">
                  DOWNLOAD
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link navbar-custom" to="/#contact">
                  CONTACT
                </HashLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-custom" to="/registration">
                  REGISTRATION
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-custom" to="/login">
                  SIGN IN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="hr-line" />
    </div>
  );
};

export default NavBar;
