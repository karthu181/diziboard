import React from "react";
import ParentDashboardNav from "./ParentDashboardNav/ParentDashboardNav";
import ParentDashboardKidList from "./ParentDashboardKidList/ParentDashboardKidList";
import ParentDashboardFooter from "./ParentDashboardFooter/ParentDashboardFooter";
import ParentDashboardEachKidDetails from "./ParentDashboardEachKidDetails/ParentDashboardEachKidDetails";
import { Routes, Route } from "react-router-dom";
import "./ParentDashboard.css";

const ParentDashboard = () => {
  return (
    <div className="parent-dashboard-bg-container">
      <ParentDashboardNav />
      <Routes>
        <Route exact path="/" element={<ParentDashboardKidList />} />
        <Route
          path="/parent-kid-details"
          element={<ParentDashboardEachKidDetails />}
        />
      </Routes>
      <div className="parent-dash-footer-container">
        <ParentDashboardFooter />
      </div>
    </div>
  );
};
export default ParentDashboard;
