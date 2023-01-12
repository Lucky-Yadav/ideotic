import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginloading, sucessLogin } from "../store/auth/action";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  //Retrieve the auth token from the store
  const token = useSelector((state) => state.auth.token);
  //Allows the component to use the Redux Dispatch function
  const dispatch = useDispatch();
  //State hook to manage the loginData object
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  //Function handlechange, to update the loginData state object
  const handlechange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Function to handle the login process
  const handlelogin = () => {
    console.log(1);
    //dispatch an action to change the loading state of the component
    dispatch(loginloading());
    axios({
      method: "post",
      url: "https://ideotic-backend-gilt.vercel.app/users/signin",
      data: loginData,
    }).then((res) => {
      //dispatch an action to change the login state after a successful login
      dispatch(sucessLogin(res.data));
      let token = res.data.token;
      //store the login data in localstorage
      localStorage.setItem("logindata", JSON.stringify(loginData));
      console.log(res, token);
    });
  };
  //check if the user is already logged in and redirect if true
  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div className="div">
        {/*map through the loginData object and create a TextField component for each key*/}
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
          {/*Check the login state and change the text of the button accordingly*/}
          {token ? "log out" : "log in"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
