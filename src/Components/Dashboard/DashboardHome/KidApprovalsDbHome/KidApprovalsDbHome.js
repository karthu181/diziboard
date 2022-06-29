import "./KidApprovalsDbHome.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const KidApprovalsDbHome = (props) => {
  const { sectionDataForDashboard } = props;
  const navigate = useNavigate();
  const onClickKidApprovalsInDbHome = () => {
    navigate("/dashboard/kidapprovals");
  };
  return (
    <>
      <div
        className="dbhome-kidapprovals-container"
        onClick={onClickKidApprovalsInDbHome}
      >
        <div>
          <h1 className="dbhome-kidapprovals-sub-title">
            Kid Approvals&Requests
          </h1>

          <hr className="dbhome-kidapprovals-sub-containers-hr-line" />

          <div className="dbhome-kidrequests">
            <div className="dbhome-kidapprovals">
              <h1 className="number">{sectionDataForDashboard.kidApprovals}</h1>

              <h1 className="text">Approvals</h1>
            </div>

            <div className="dbhome-kidapprovals">
              <h1 className="dbhome-kidapprovals-number">
                {sectionDataForDashboard.kidRequests}
              </h1>

              <h1 className="dbhome-kidapprovals-text">Requests</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KidApprovalsDbHome;
