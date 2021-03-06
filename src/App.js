//import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import ResetPassword from "./Components/Reset Password/ResetPassword";
import ParentDashboard from "./Components/ParentDashboard/ParentDashboard";
import RequiredAuthForCt from "./Components/RequiredAuthForCt/RequiredAuthForCt";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/features" element={<Features />} />
          <Route path="/screens" element={<Screens />} />
          <Route path="/download" element={<Download />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/registration/*" element={<Registration />} />
          {/* <Route path="/dashboard/*" element={
          <RequiredAuthForCt redirectTo="/login">
          <Dashboard />
          </RequiredAuthForCt>} /> */}

{/* note: since all links are in dashboard, keeping auth condition for dashboard is enough
whatever links after dashboard, it all requires authorisation */}

          <Route path="/dashboard/*" element={<Dashboard/>}/>
          <Route path="/parent-dashboard/*" element={<ParentDashboard/>}/>


          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* Here you need to give /* if you want to use descendant/nested routing */}

          {/* <Route path="/dashboardhome" element={<DashboardHome />} /> */}

          {/* after login */}
          {/* <Route path="/dashboardhome" element={<DashboardHome />} />
          <Route path="/kidstatus" element={<KidStatus />} />
          <Route path="/eventmanagement" element={<EventManagement />} />
          <Route path="/holidaymanagement" element={<HolidayManagement />} />
          <Route path="/kidmarks" element={<KidMarks />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/kidapprovals" element={<KidApprovals />} />
          <Route path="/aboutme" element={<AboutMe />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <header class="App-header">
        <img src={logo} class="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          class="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
