const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");

router.get("/login", auth.login);
router.get("/register", auth.register);
router.get("/logOut", auth.logOut);
router.post("/login", auth.loginUser);
router.post("/register", auth.registerUser);

module.exports = router;
