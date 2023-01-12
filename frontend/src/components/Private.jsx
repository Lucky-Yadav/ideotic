import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  // import the token from the redux store
  const token = useSelector((state) => state.auth.token);

  // if the token does not exist, navigate to the login page
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  // if the token exists, render the children component
  return children;
};

export default Private;
