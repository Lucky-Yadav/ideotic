import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Private from "./components/Private";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div className="App">
      {/* Navbar Component */}
      <Navbar />
      <Routes>
        {/* Route for Home Component, Wrapped with Private Component for Authentication */}
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        ></Route>
        {/* Route for Login Component */}
        <Route path="/login" element={<Login />}></Route>
        {/* Route for Signup Component */}
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default App;
