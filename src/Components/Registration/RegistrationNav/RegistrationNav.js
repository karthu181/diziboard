import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationNav.css";

const RegistrationNav = () => {
  return (
    // try shortening code using map
    <div className="dashboard-nav-bg-container">
      <nav className="dashboard-nav-container">
        <div>
          <img
            alt="db nav logo"
            className="db-nav-logo"
            src="http://192.168.0.116:8080/css/images/logo.png"
          />
        </div>
        <ul className="db-nav-ul-list-container">
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/registration/"
            >
              Parent Registration
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/registration/school-registration"
            >
              School Registration
            </Link>
          </li>        </ul>
      </nav>
    </div>
  );
};

export default RegistrationNav;
