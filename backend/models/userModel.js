const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pfp: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone: { type: Number, required: true },
    role: {
      type: String,
      enum: ["hr", "it", "employee", "admin"],
      required: true,
    },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
