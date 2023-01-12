const express = require("express");
const app = express();
const PORT = 3070;
const cors = require("cors");
var jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");

// middleware to parse JSON in the request body
app.use(express.json());
// middleware to handle CORS
app.use(cors());
// use the userRouter for all routes starting with '/users'
app.use("/users", userRouter);

// connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://user:wGPrQ0iGQM3rO4nZ@cluster0.zkwpvpy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("handshake successful");
    // start the server
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
