// initializes
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// app
const app = express();

// port
const port = process.env.PORT || 3000;

// routes
const homeRoute = require('./routes/home');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

// middleware
app.use(cookieParser());
app.use(cors());
app.use(require('./middleware/verifyToken'))

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.disable('view cache');

app.use('/', homeRoute);
app.use('/', authRoute);
app.use('/products', productRoute);
app.use('/admin', adminRoute);

// mongoose
mongoose.set('strictQuery', true)
mongoose
	.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
	.then(() => {
		app.listen(port, () => {
			console.log('Connected successfully ✅');
		});
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = app;
