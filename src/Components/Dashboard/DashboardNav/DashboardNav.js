import React from "react";
import { Link } from "react-router-dom";
import "./DashboardNav.css";

const DashboardNav = () => {
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
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/kidstatus"
            >
              Kid Status
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/eventmanagement"
            >
              Event Management
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/holidaymanagement"
            >
              Holiday Management
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/kidmarks"
            >
              Kid Marks
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/attendance"
            >
              Attendance
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/diary"
            >
              Diary
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/kidapprovals"
            >
              Kid Approvals
            </Link>
          </li>
          <li>
            <Link
              className="text-decoration-none me-3 db-nav-link-item"
              to="/dashboard/aboutme"
            >
              About Me
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardNav;
