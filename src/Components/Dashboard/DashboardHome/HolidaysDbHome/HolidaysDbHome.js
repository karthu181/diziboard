import "./HolidaysDbHome.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const HolidaysDbHome = (props) => {
  const { holidaysData } = props;

  const navigate = useNavigate();
  const onClickHolidayManagement = () => {
    navigate("/dashboard/holidaymanagement");
  };

  return (
    <div
      className="holiday-container col-md-4 col-8"
      onClick={onClickHolidayManagement}
    >
      <div>
        <h1 className="db-sub-title">Holiday</h1>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="bday-bottom-container">
        <div>
          <h1 className="bday-heading">{holidaysData.yaer_holidays}</h1>
          <p className="bday-description">Year</p>
        </div>
        <div>
          <h1 className="bday-heading">{holidaysData.month_holidays}</h1>
          <p className="bday-description">Month</p>
        </div>
        <div>
          <h1 className="bday-heading">{holidaysData.week_holidays}</h1>
          <p className="bday-description">Week</p>
        </div>
      </div>
    </div>
  );
};

export default HolidaysDbHome;
