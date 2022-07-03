import React from "react";
import { Overlay } from "react-bootstrap";

const AboutMe = () => {
  // const closePopupEvent = () => {
  //   overlay.className = "";
  //   closePopupEvent.className=""

  // }
  // const buttonOnClick = () => {
  //   overlay.className = "show";
  //   popup.className="show"
  // }
  const localStorageTest = localStorage.getItem("test1");
  console.log(localStorageTest);
  const loggedInUserProfile = localStorage.getItem("diziUserProfile");
  console.log(loggedInUserProfile);
  return (
    <div>
      {/* <h1>{loggedInUserProfile.body.mas_userId}</h1> */}
      {/* <div>
      <button type="button" onClick={buttonOnClick}>
        show popup
      </button>
      </div> */}
    </div>
  );
};

export default AboutMe;
