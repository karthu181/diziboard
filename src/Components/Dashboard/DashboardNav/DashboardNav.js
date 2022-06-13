import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/kidstatus">Kid Status</Link>
        <Link to="/eventmanagement">Event Management</Link>
        <Link to="/holidaymanagement">Holiday Management</Link>
        <Link to="/kidmarks">Kid Marks</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/diary">Diary</Link>
        <Link to="kidapprovals">Kid Approvals</Link>
        <Link to="aboutme">About Me</Link>
      </nav>
    </div>
  );
};

export default DashboardNav;
