const mongoose = require("mongoose");

// Define the UserSchema with fields for username, email, and password
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // timestamps will automatically add createdAt and updatedAt fields to the schema
  },
  { timestamps: true }
);

// Export the User model using the UserSchema
module.exports = mongoose.model("User", UserSchema);
