const User = require("../models/LoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isCheck = (input) => !input;

const postSignup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(req.body, "req.body");
  try {
    if (isCheck(email) || isCheck(password) || isCheck(confirmPassword)) {
      res.status(400).json({ e: "Something is missing  " });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log("Unable to Create new User");
        return res.status(404).json({ e: "Unable To Create New User" });
      }
      await User.create({ email, password: hash });
      res.status(201).json({ message: "User Created Successfully" });
    });
  } catch (e) {
    console.log(e);
    res.status(403).json(e);
  }
};

const generateToken = (id, email) => {
  return jwt.sign({ id: id, email: email }, "secretkey");
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (isCheck(email) || isCheck(password)) {
      res.status(400).json({ e: "Something is missing " });
    }
    const user = await User.findOne({ where: { email } });
    // console.log(user, "USER");
    if (user) {
      console.log(user.email, "email");
      bcrypt.compare(password, user.password, async (err, response) => {
        if (err) {
          throw new Error("Something is wrong");
        }
        if (response) {
          console.log("exist");
          return res.status(200).json({
            success: true,
            message: "User LoggedIn Successfully",
            token: generateToken(user.id, user.email),
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Password is Incorrect" });
        }
      });
    } else {
      res.status(404).json({ success: false, message: "User Doesnot Exist" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e });
    console.log("ERROR In PostLogin", e);
  }
};

module.exports = {
  postSignup,
  postLogin,
};
