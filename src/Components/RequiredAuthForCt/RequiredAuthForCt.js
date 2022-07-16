import React from "react";
import { Route, Navigate} from "react-router-dom";
import Cookies from "js-cookie";

const RequiredAuthForCt = (props) => {
  const {children, redirectTo}=props

    let loginToken = Cookies.get("loginToken");
  if (loginToken === undefined) {
    return <Navigate to={redirectTo} replace={true}/>;
  }
  return children;
};

export default RequiredAuthForCt;