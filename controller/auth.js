const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
  res.render('auth/register')
}

module.exports.login = (req, res) => {
  res.render('auth/login')
};

module.exports.loginUser = async (req, res) => {
  const email = req.body.email;
	const password = req.body.password;
	if (email && password) {
		await User.findOne({
			email: email,
			password: password,
		})
			.then((user) => {
				if (user) {
					res.cookie("token", jwt.sign({ user: email }, process.env.JWT_SECRET));
          res.redirect('/')
				} else {
					res.status(401);
					res.send('Email or password is incorrect');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
}

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return;
  }

  const candidate = await User.findOne({ email });

  if (candidate) {
    res.redirect("/register");
    return;
  }

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  const token = await jwt.sign({ user: email }, process.env.JWT_SECRET);

  await user.save()
  res.cookie("token", token);
  res.redirect("/");
}

module.exports.logOut = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
}
