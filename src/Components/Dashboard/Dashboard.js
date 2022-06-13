import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutMe from "./AboutMe/AboutMe";
import Attendance from "./Attendance/Attendance";
import DashboardHome from "./DashboardHome/DashboardHome";
import Diary from "./Diary/Diary";
import EventManagement from "./EventManagement/EventManagement";
import HolidayManagement from "./HolidayManagement/HolidayManagement";
import KidApprovals from "./KidApprovals/KidApprovals";
import KidMarks from "./KidMarks/KidMarks";
import KidStatus from "./KidStatus/KidStatus";

const Dashboard = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboardhome" element={<DashboardHome />} />
          <Route path="/kidstatus" element={<KidStatus />} />
          <Route path="/eventmanagement" element={<EventManagement />} />
          <Route path="/holidaymanagement" element={<HolidayManagement />} />
          <Route path="/kidmarks" element={<KidMarks />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/kidapprovals" element={<KidApprovals />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Dashboard;
