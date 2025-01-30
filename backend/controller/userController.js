const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerator(id, email) {
  return jwt.sign({ id: id, email: email }, process.env.AUTH_KEY, {
    expiresIn: "30d",
  });
}

exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, pfp, phone, role } = req.body;
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      res
        .status(400)
        .json({ success: false, message: "Please Enter all the fields" });
    }
    //check if user already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //register a new user
    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      role: role,
      pfp: pfp
        ? pfp
        : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default pfp
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    //login logic
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === false) {
        return res
          .status(401)
          .json({ success: false, message: "Password do not match" });
      }
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
      if (user.status === "suspended") {
        return res.status(403).json({
          success: false,
          message:
            "Your account has been suspended. Please contact yourcompany@gmail.com",
        });
      }
      const token = tokenGenerator(user.id, email);
      return res.status(200).json({
        success: true,
        message: "Login Successful",
        id: user.id,
        token: token,
        firstName: user.firstName,
        lastName: user.lastName,
        pfp: user.pfp,
        email: user.email,
        role: user.role,
        phone: user.phone,
      });
    });
  } catch (error) {
    res.status(500).json({ success: "fail", message: error });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json({ success: true, data: Users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
