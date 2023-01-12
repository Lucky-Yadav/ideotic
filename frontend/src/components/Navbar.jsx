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
  const [isprocessing, setisprocessing] = useState(false);
  useEffect(() => {
    let logindata = JSON.parse(localStorage.getItem("logindata"));
    if (logindata) {
      setisprocessing(true);
      axios({
        method: "post",
        url: "http://localhost:3070/users/signin",
        data: logindata,
      }).then((res) => {
        dispatch(sucessLogin(res.data));
        console.log(res, token);
        setisprocessing(false);
      });
    }
  }, []);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
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
