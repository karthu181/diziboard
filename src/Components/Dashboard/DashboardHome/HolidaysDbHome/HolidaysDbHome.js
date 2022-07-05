import "./HolidaysDbHome.css";
import React from "react";

const HolidaysDbHome = (props) => {
  const { holidaysData, settingRightContainer } = props;

  //writing right side container display in this component only and passing this jsx returned
  // fn in object as argument to fn

  const displayHolidaysRight = () => {
    return (
      <div>
        <h1 className="db-right-container-holidays-heading">
          Holidays List In Week
        </h1>
        <p className="dbhome-holidays-no-items-to-display">
          No items to display
        </p>
      </div>
    );
  };

  const onClickHolidaysHandler = () => {
    settingRightContainer({ display: displayHolidaysRight });
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };

  return (
    <div className="dbhome-holiday-container" onClick={onClickHolidaysHandler}>
      <div>
        <h1 className="dbhome-holidays-sub-title">Holiday</h1>
      </div>
      <hr className="dbhome-holidays-sub-containers-hr-line" />
      <div className="dbhome-holidays-bottom-container ">
        <div>
          <h1 className="dbhome-holidays-heading">
            {holidaysData.yaer_holidays}
          </h1>
          <p className="dbhome-holidays-description">Year</p>
        </div>
        <div>
          <h1 className="dbhome-holidays-heading">
            {holidaysData.month_holidays}
          </h1>
          <p className="dbhome-holidays-description">Month</p>
        </div>
        <div>
          <h1 className="dbhome-holidays-heading">
            {holidaysData.week_holidays}
          </h1>
          <p className="dbhome-holidays-description">Week</p>
        </div>
      </div>
    </div>
  );
};

export default HolidaysDbHome;
