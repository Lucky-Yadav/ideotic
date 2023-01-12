import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sucessLogin } from "../store/auth/action";
import { logoutsuccess } from "../store/auth/action";
import logingif from "../images/andqkhtlhb8x786uqbes.gif";
import signupgif from "../images/signup.gif";
import processinggif from "../images/processing.gif";
import { useState } from "react";

const Navbar = () => {
  // useState hook to keep track of the processing state
  const [isprocessing, setisprocessing] = useState(false);

  // useEffect hook to check for login data in localStorage
  useEffect(() => {
    let logindata = JSON.parse(localStorage.getItem("logindata"));
    if (logindata) {
      setisprocessing(true);
      axios({
        method: "post",
        url: "https://ideotic-backend-gilt.vercel.app/users/signin",
        data: logindata,
      }).then((res) => {
        dispatch(sucessLogin(res.data));
        console.log(res, token);
        setisprocessing(false);
      });
    }
  }, []);

  // useSelector hook to get the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  // function to handle logout button click
  const handlelogout = () => {
    setisprocessing(true);
    localStorage.removeItem("logindata");
    dispatch(logoutsuccess());
    setisprocessing(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to={"/"}>Home</Link>
          </Box>
          {token ? (
            <Box
              onClick={handlelogout}
              style={{ cursor: "pointer" }}
              sx={{ flexGrow: 0 }}
            >
              Log Out
            </Box>
          ) : (
            <div className="registration">
              <Link to="/login">
                <Box style={{ cursor: "pointer" }} sx={{ flexGrow: 0 }}>
                  <img className="logingif" src={logingif} alt="" />
                </Box>
              </Link>
              <Link to="/signup">
                <Box style={{ cursor: "pointer" }} sx={{ flexGrow: 0 }}>
                  <img className="signupgif" src={signupgif} alt="" />
                </Box>
              </Link>
            </div>
          )}
          <div className="processing">
            <img
              className={isprocessing === true ? "" : "hidden"}
              src={processinggif}
              alt=""
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
