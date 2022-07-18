import "./Login.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import Cookies from "js-cookie";

const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailedMsg,setLoginFailedMsg]=useState()

  const onUserInputChange = (event) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //onlogin success
  const onLoginSuccess=(tokenObj)=>{
    Cookies.set("loginToken", tokenObj.access_token, { expires: 1 });
    getUserProfile(tokenObj.access_token);
    navigate("/dashboard", { replace: true })
  }
  //on login failure
  const onLoginFailure=()=>{
    setLoginFailedMsg("failed")
  }
  //get userprofile only when access token is not undefined this is called from onclick let me in eventhandler

  const getUserProfile = async (accessToken) => {
    const getUserProfileOptions = {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const getUserProfileUrl =
      "http://192.168.0.116:8280/mas_getuserprofiles/v1/getUserProfile?mas_userId=ct2%40gmail.com&mas_guid=dfg&mas_requestedOn=hfgh&mas_requestedFrom=gfh&mas_geoLocation=gfh";
    try {
      const response = await fetch(getUserProfileUrl, getUserProfileOptions);
      const userProfileObj = await response.json();

      // storing in local storage user profile. delete on logout
      // storing in local storage has not access to other applications.
      // this will be stored in browser in our application, references to our application
      // this data will not have accss to other applications in browser??
      //you must store in string format in local storage
      localStorage.setItem(
        "diziUserProfile",
        JSON.stringify(userProfileObj.body)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const getSchoolStatus = async () => {
  //   const getSchoolStatusOptions = {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const getSchoolStatusUrl =
  //     "http://192.168.0.116:8280/mas_get_School_Status/1.0/get_School_Status?mas_uid=5911355945&userId=ct2%40gmail.com&mas_requestedOn=2022-7-1%2014%3A32%3A1&mas_requestedFrom=Mozilla%2F5.0%20(Linux%3B%20Android%206.0%3B%20Nexus%205%20Build%2FMRA58N)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.0.0%20Mobile%20Safari%2F537.36&mas_guId=52f03b32-51bd-161b-e03f-28340c3fff50&mas_geoLocation=anonymous&userRef=ct2%40gmail.com";
  //   try {
  //     const response = await fetch(getSchoolStatusUrl, getSchoolStatusOptions);
  //     const SchoolStatusObj = await response.json();

  //     // storing in local storage user profile. delete on logout
  //     // storing in local storage has not access to other applications.
  //     // this will be stored in browser in our application, references to our application
  //     // this data will not have accss to other applications in browser??

  //     // localStorage.setItem("diziUserProfile", userProfileObj)

  //     console.log(userProfileObj);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //let me button handler login btn
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
      console.log(tokenObj)

      //if access token is success
      if (tokenObj.access_token !== undefined) {
        onLoginSuccess(tokenObj)
      }
      else{
        onLoginFailure()
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
        <form className="login-form-container" onSubmit={letMeInHandler}>
          <div className="login-user-name-container">
            <div className="login-fa-envelope-container">
              <FaEnvelope />
            </div>
            <div className="login-input-container">
              <input
                onChange={onUserInputChange}
                className="login-input-box"
                placeholder="Username"
                type="text"
              />
            </div>
          </div>
          <div className="login-user-name-container">
            <div className="login-fa-envelope-container">
              <FaKey />
            </div>
            <div className="login-input-container">
              <input
                onChange={onPasswordChange}
                className="login-input-box"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary btn-block btn-large login-let-me-in-button"
              type="submit"
            >
              Let me in
            </button>
          </div>
          <div className="login-forgot-signup-container">
            <p className="login-white-text">Forgot Password?</p>
            <p className="login-white-text">Sign up</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
