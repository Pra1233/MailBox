const jwt = require("jwt");
const User = require("../models/LoginModel");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "secretkey");
    User.findByPk(user.id).then((user) => {
      req.user = user;
      next();
    });
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .json({ success: "false", message: "Authorization fail" });
  }
};
module.exports = { auth };
