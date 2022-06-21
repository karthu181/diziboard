import "./KidApprovalsDbHome.css";
import React from "react";

const KidApprovalsDbHome = () => {
  return (
    <>
      <div className="kid-container col-md-4 col-8">
        <div>
          <h1 className="db-sub-title">Kid Approvals&Requests</h1>

          <hr className="db-sub-containers-hr-line" />

          <div className="requests">
            <div className="approvals">
              <h1 className="number">22</h1>

              <h1 className="text">Approvals</h1>
            </div>

            <div className="approvals">
              <h1 className="number">41</h1>

              <h1 className="text">Requests</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KidApprovalsDbHome;
