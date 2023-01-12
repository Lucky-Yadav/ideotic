const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Secret_key";

// function for handling signup
const signup = async (req, res) => {
  // destructuring the request body
  const { username, email, password } = req.body;

  try {
    // check if the user already exists
    const existinguser = await userModel.findOne({ email: email });
    if (existinguser) {
      // if the user already exists, return a bad request
      return res.status(400).json({ message: "User already exists" });
    }
    // hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // create the user in the database
    const result = await userModel.create({
      email: email,
      password: hashpassword,
      username: username,
    });

    // create a JWT token
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    // return the created user and the token
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    // if an error occurs, return a server error
    res.status(501).json({ message: "something went wrong" });
  }
};

// function for handling signin
const signin = async (req, res) => {
  // destructuring the request body
  const { email, password } = req.body;

  try {
    // check if the user exists
    const existinguser = await userModel.findOne({ email: email });
    if (!existinguser) {
      // if the user does not exist, return a bad request
      return res.status(400).json({ message: "User not found" });
    }
    // compare the provided password with the hashed password in the database
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      // if the passwords do not match, return a bad request
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create a JWT token
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      SECRET_KEY
    );
    // return the user and the token
    res.status(201).json({ user: existinguser, token: token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signin, signup };
