const express = require("express");
const LoginController = require("../controllers/LoginController");
const router = express.Router();

router.post("/adduser", LoginController.postSignup);

router.post("/loginuser", LoginController.postLogin);

module.exports = router;
