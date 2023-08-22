const jwt = require("jsonwebtoken");
const User = require('../models/user')

module.exports = async function (req, res, next) {
  const isToken = req.cookies.token ? true : false;
  res.locals.token = isToken;

  if (isToken) {
    const { user } = jwt.decode(req.cookies.token);
    const existUser = await User.findOne({
      email: user
    });
    res.locals.isAdmin = existUser.role === "admin" ? true : false;
  }
  next();
}
