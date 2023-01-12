import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginloading, sucessLogin } from "../store/auth/action";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Signup = () => {
  // import the token from the redux store
  const token = useSelector((state) => state.auth.token);
  // import the useDispatch hook
  const dispatch = useDispatch();
  // useState hook to keep track of the login form data
  const [loginData, setloginData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // function to handle changes on the input fields
  const handlechange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function to handle login
  const handlelogin = () => {
    // call the loginloading action
    dispatch(loginloading());
    // make a post request to the server
    axios({
      method: "post",
      url: "https://ideotic-backend-gilt.vercel.app/users/signup",
      data: loginData,
    }).then((res) => {
      // call the sucessLogin action and pass the token as an argument
      dispatch(sucessLogin(res.data.token));
    });
  };
  // if the token exists, navigate to the homepage
  if (token) {
    return <Navigate to={"/"} />;
  }
  // render the login form and the login button
  return (
    <div>
      <div className="div">
        {Object.keys(loginData).map((el) => (
          <TextField
            key={el}
            value={loginData[el]}
            onChange={handlechange}
            name={el}
            id={el}
            label={el.toLocaleUpperCase()}
            variant="outlined"
            required
          />
        ))}
      </div>

      <div className="button">
        <br />
        <Button
          onClick={handlelogin}
          variant="contained"
          endIcon={<SendIcon />}
        >
          {token ? "log out" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default Signup;
