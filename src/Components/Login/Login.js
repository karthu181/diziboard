import "./Login.css";
import React from "react";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onUserInputChange = (event) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const letMeInHandler = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    const options = {
      method: "POST",
      headers: {
        authorization:
          "Basic " +
          btoa(
            "caOy0SPygHWCULpa3GREF02pNCka" +
              ":" +
              "06U5o38fXtJEiONfd4EwsM12Qywa"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=password&username=${username}&password=${password}`,
    };
    const url = "http://192.168.0.116:8280/token";
    try {
      const response = await fetch(url, options);
      const tokenObj = await response.json();
      console.log(tokenObj);

      if (tokenObj.access_token !== undefined) {
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }; //what is the use of try catch?? only for developers to know what is error????

  return (
    <div className="login-bg-container">
      <div className="login-details-container">
        <img
          alt="login page logo"
          className="login-page-logo"
          src="http://192.168.0.116:8080/css/images/logo.png"
        />

        <h1 className="login-text">Login</h1>
        <form className="form-container" onSubmit={letMeInHandler}>
          <div className="user-name-container">
            <div className="fa-envelope-container">
              <FaEnvelope />
            </div>
            <div className="input-container">
              <input
                onChange={onUserInputChange}
                className="input-box"
                placeholder="Username"
                type="text"
              />
            </div>
          </div>
          <div className="user-name-container">
            <div className="fa-envelope-container">
              <FaKey />
            </div>
            <div className="input-container">
              <input
                onChange={onPasswordChange}
                className="input-box"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary btn-block btn-large let-me-in-button"
              type="submit"
            >
              Let me in
            </button>
          </div>
          <div className="forgot-signup-container">
            <p className="white-text">Forgot Password?</p>
            <p className="white-text">Sign up</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
