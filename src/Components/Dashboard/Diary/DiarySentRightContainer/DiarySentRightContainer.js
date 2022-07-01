import React from "react";
import "./DiarySentRightContainer.css";

const DiarySentRightContainer = (props) => {
  const { selectedNotification } = props;
  console.log(selectedNotification);

  if (selectedNotification.length === 0) {
    return (
      <div>
        <p className="dairy-sent-right-before-click">
          Click on notification list on
        </p>
        <p className="dairy-sent-right-before-click-bottom">view</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="diary-sent-right-container-heading">
          <div className="diary-right-container-first-letter-container">
            <h1 className="diary-right-container-first-letter">
              {selectedNotification.mas_notificationType === "single"
                ? selectedNotification.kidName[0].toUpperCase()
                : "A"}
            </h1>
          </div>
          <p className="dairy-right-paragraph-kidname">
            {selectedNotification.kidName !== null
              ? selectedNotification.kidName
              : "All Kids"}
          </p>
        </div>
        <div className="dairy-right-first-container">
          <label className="dairy-right-label-subject">Subject:</label>
          <p className="dairy-right-paragraph-subject">
            {selectedNotification.mas_subject}
          </p>
        </div>
        <div className="dairy-right-second-container">
          <label className="dairy-right-label-subject">Date:</label>
          <p className="dairy-right-paragraph-subject">
            {selectedNotification.mas_createdOn}
          </p>
          <p className="dairy-right-paragraph-subject">
            {selectedNotification.mas_notifiedOn}
          </p>
        </div>
        <div className="dairy-right-second-container">
          <label className="dairy-right-label-subject">Description:</label>
          <p className="dairy-right-paragraph-subject">
            {selectedNotification.mas_description}
          </p>
        </div>
      </>
    );
  }
};

export default DiarySentRightContainer;
