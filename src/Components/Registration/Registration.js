import React from "react";
import RegistrationNav from "./RegistrationNav/RegistrationNav";
import DashboardFooter from "../Dashboard/DashboardFooter/DashboardFooter";
import SchoolRegistration from "./SchoolRegistration/SchoolRegistration";
import ParentRegistration from "./ParentRegistration/ParentRegistration";
import { Routes, Route } from "react-router-dom";

const Registration = () => {
  return <div>
    <RegistrationNav/>
      <Routes>
        <Route exact path="/" element={<ParentRegistration />}/>
        <Route exact path="/school-registration" element={<SchoolRegistration />}/>
      </Routes>
      <DashboardFooter/>
  </div>
};

export default Registration;
