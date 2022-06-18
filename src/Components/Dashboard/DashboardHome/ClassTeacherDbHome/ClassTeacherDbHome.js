import React from "react";
import "./ClassTeacherDbHome.css";

const ClassTeacherDbHome = () => {
  return (
    <div className="background-container col-4">
      <div>
        <div className="image-container1">
          <img
            className="image1"
            src="http://192.168.0.116:8080/getimages/classteacher/5911355945/ct2@gmail.com.jpg"
            alt="class teacher logo"
          />
          <div className="title-container">
            <h1 className="db-ct2-sub-title">Class Teacher2 CT </h1>
            <h1 className="db-ct2-sub-title">Active </h1>
          </div>
        </div>
        <hr className="db-sub-containers-hr-line" />
        <div className="school-details">
          <p className="title1">School Name:</p>
          <p className="title1">santosh high school</p>
        </div>
        <hr className="db-sub-containers-hr-line" />
        <div className="school-details">
          <p className="title1">School UniqueId:</p>
          <p className="title1">5911355945</p>
        </div>
        <hr className="db-sub-containers-hr-line" />
        <div className="school-details">
          <p className="title1">Created On:</p>
          <p className="title1">2018-02-04</p>
        </div>
        <hr className="db-sub-containers-hr-line" />
      </div>
    </div>
  );
};

export default ClassTeacherDbHome;
