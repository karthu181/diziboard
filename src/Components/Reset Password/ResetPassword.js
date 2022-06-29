import "./ResetPassword.css";
import React from "react";
import { useState } from "react";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const ResetPassword = () => {
  const [password1, setPassword1] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onPassword1Change = (event) => {
    setPassword1(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    // const userDetails = { username, password };
    // const options = {
    //   method: "POST",
    //   headers: {
    //     authorization:
    //       "Basic " +
    //       btoa(
    //         "caOy0SPygHWCULpa3GREF02pNCka" +
    //           ":" +
    //           "06U5o38fXtJEiONfd4EwsM12Qywa"
    //       ),
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: `grant_type=password&username=${username}&password=${password}`,
    // };
    // const url = "http://192.168.0.116:8280/token";
    // try {
    //   const response = await fetch(url, options);
    //   const tokenObj = await response.json();
    //   console.log(tokenObj);
    //   Cookies.set("loginToken", tokenObj.access_token, { expires: 1 });

    //   if (tokenObj.access_token !== undefined) {
    //     navigate("/dashboard");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }; //what is the use of try catch?? only for developers to know what is error????

  return (
    <div className="reset-bg-container">
      <div className="reset-details-container">
        <img
          alt="login page logo"
          className="reset-page-logo"
          src="http://192.168.0.116:8080/css/images/logo3.png"
        />

        <h1 className="reset-text">Reset Password</h1>
        <form className="reset-form-container" onSubmit={resetPasswordHandler}>
          <div className="reset-passwords-container">
            <div className="fa-envelope-container">
              <FaKey />
            </div>
            <div className="reset-password1-input-container">
              <input
                onChange={onPassword1Change}
                className="reset-input-box"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="user-name-container">
            <div className="fa-envelope-container">
              <FaKey />
            </div>
            <div className="reset-password1-input-container">
              <input
                onChange={onConfirmPasswordChange}
                className="reset-input-box"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary btn-block btn-large reset-password-button"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
