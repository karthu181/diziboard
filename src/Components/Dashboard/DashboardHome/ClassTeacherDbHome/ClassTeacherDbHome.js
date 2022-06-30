import "./ClassTeacherDbHome.css";
import React from "react";

const ClassTeacherDbHome = () => {
  return (
    <div className="ct-dbhome-background-container">
      <div>
        <div className="ct-db-home-image-heading-container">
          <img
            className="dbhome-ct-image1"
            src="http://192.168.0.116:8080/getimages/classteacher/5911355945/ct2@gmail.com.jpg"
            alt="class teacher logo"
          />
          <div className="dbhome-ct-title-container">
            <h1 className="db-ct2-sub-title">ClassTeacher2 CT </h1>
            <h1 className="db-ct2-sub-title">Active </h1>
          </div>
        </div>
        <hr className="dbhome-ct2-sub-containers-hr-line" />
        <div className="db-ct-school-details">
          <div className="db-ct-subhead-container">
            <p className="dbhome-ct-subhead-and-ans">School Name:</p>
          </div>
          <div className="db-ct-subhead-ans-container">
            <p className="dbhome-ct-subhead-and-ans">santosh high school</p>
          </div>
        </div>
        <hr className="dbhome-ct2-sub-containers-hr-line" />
        <div className="db-ct-school-details">
          <div className="db-ct-subhead-container">
            <p className="dbhome-ct-subhead-and-ans">School UniqueId:</p>
          </div>
          <div className="db-ct-subhead-ans-container">
            <p className="dbhome-ct-subhead-and-ans">5911355945</p>
          </div>
        </div>
        <hr className="dbhome-ct2-sub-containers-hr-line" />
        <div className="db-ct-school-details">
          <div className="db-ct-subhead-container">
            <p className="dbhome-ct-subhead-and-ans">Created On:</p>
          </div>
          <div className="db-ct-subhead-ans-container">
            <p className="dbhome-ct-subhead-and-ans">2018-02-04</p>
          </div>
        </div>
        <hr className="dbhome-ct2-sub-containers-hr-line" />
      </div>
    </div>
  );
};

export default ClassTeacherDbHome;
