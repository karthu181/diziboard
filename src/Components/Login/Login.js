import "./Login.css";
import React from "react";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "http://192.168.0.116:8280/token";
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

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
