import React from "react";

const AboutMe = () => {
  // const closePopupEvent = () => {
  //   overlay.className = "";
  //   closePopupEvent.className=""

  // }
  // const buttonOnClick = () => {
  //   overlay.className = "show";
  //   popup.className="show"
  // }
  const loggedInUserProfile = localStorage.getItem("diziUserProfile");

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
