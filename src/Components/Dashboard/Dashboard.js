import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutMe from "./AboutMe/AboutMe";
import Attendance from "./Attendance/Attendance";
import DashboardHome from "./DashboardHome/DashboardHome";
import DashboardNav from "./DashboardNav/DashboardNav";
import Diary from "./Diary/Diary";
import EventManagement from "./EventManagement/EventManagement";
import HolidayManagement from "./HolidayManagement/HolidayManagement";
import KidApprovals from "./KidApprovals/KidApprovals";
import KidMarks from "./KidMarks/KidMarks";
import KidStatus from "./KidStatus/KidStatus";

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/kidstatus" element={<KidStatus />} />
        <Route path="/eventmanagement" element={<EventManagement />} />
        <Route
          path="/dashboard/holidaymanagement"
          element={<HolidayManagement />}
        />
        <Route path="/kidmarks" element={<KidMarks />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/kidapprovals" element={<KidApprovals />} />
        <Route path="/aboutme" element={<AboutMe />} />
        {/* 1. for nested routing,=> routing inside routing, 
              use /dashboard/* for path inside Browser router to support further routing
              to render descendant routes you need to use /* for parent Route
              
              for nested or descendANT ROUTES YOU NO NEED to use <brouserRouter>
              just use <Routes> and <Route/> components but parent of this must be in main <BrowserRouter/>
              
              2. for nested <Route path=/kidstatus
            3. for link <Link to=/dashboard/kidstatus
                 
                 */}
      </Routes>
    </div>
  );
};

export default Dashboard;
