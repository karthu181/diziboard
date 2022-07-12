import "./BirthdaysDbHome.css";
import React from "react";

const BirthdaysDbHome = (props) => {
  const { birthdaysObj, settingRightContainer } = props;

  //writing right side container display in this component only and passing this jsx returned
  // fn in object as argument to fn

  // const displayBirthdaysRight = () => {
  //   return (
  //     <div>
  //       <h1 className="db-right-container-birthdays-heading">
  //         Birthdays Today
  //       </h1>
  //       <div className="db-birthdays-right-container-body">
  //         <p>No items to display</p>
  //       </div>
  //     </div>
  //   );
  // };

  const onClickBirthdaysHandler = () => {
    settingRightContainer("birthdaysClicked");
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };

  return (
    <div
      className="dbhome-birthday-container"
      onClick={onClickBirthdaysHandler}
    >
      <div>
        <h1 className="dbhome-birthdays-sub-title">Birthdays</h1>
      </div>
      <hr className="dbhome-birthdays-sub-containers-hr-line " />
      <div className="dbhome-bday-bottom-container">
        <div>
          <h1 className="dbhome-bday-heading">
            {birthdaysObj.Month !== undefined ? birthdaysObj.Month.length : ""}
          </h1>
          <p className="dbhome-bday-description">Month</p>
        </div>
        <div>
          <h1 className="dbhome-bday-heading">
            {birthdaysObj.Week !== undefined ? birthdaysObj.Week.length : ""}
          </h1>
          <p className="dbhome-bday-description">Week</p>
        </div>
        <div>
          <h1 className="dbhome-bday-heading">
            {birthdaysObj.Today !== undefined ? birthdaysObj.Today.length : ""}
          </h1>
          <p className="dbhome-bday-description">Today</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdaysDbHome;
