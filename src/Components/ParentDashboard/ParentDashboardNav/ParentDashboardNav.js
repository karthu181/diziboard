import React from "react";
import { Link } from "react-router-dom";
import "./ParentDashboardNav.css"

const ParentDashboardNav=()=>{
    return (
        <div className="dashboard-nav-bg-container parent-dash-nav-bg">
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
              to="/parent-dashboard/"
            >
              Kid List
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    )
}
export default ParentDashboardNav