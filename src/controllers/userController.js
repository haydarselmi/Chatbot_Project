const User = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.verifyUserConnection = async (req, res) => {
	try {
		const user = await User.find({ username: req.body.username, password: req.body.password });
		if (user.length != 0) {
			global.loggedUser = user;
			if (global.loggedUser.isAdmin != false) {
				res.render('chatbotPanel');
			}
			else {
				res.render('chatbotMessenger');
			}
		}
		else {
			res.status(400).send('Error of username or password');
		}
	}
	catch (error) {
		res.status(400).send(error);
	}
};

exports.verifyEmail = async (name) => {
	try {
		const user = await User.findOne({ username: name });
		console.log(user);
		if (user != null) {
			return false;
		}
		return true;
	}
	catch (error) {
		console.error('L\'email est déjà présent');
	}
};

exports.createUser = async (req, res) => {
	try {
		req.body.isAdmin = false;
		// Hasing password for storage
		const available = await this.verifyEmail(req.body.username);
		if (!available) {
			res.status(400).send('L\'email est déjà inscrit');
			return null;
		}
		const hashedPWD = await bcrypt.genSalt(10)
			.then(salt => {
				return bcrypt.hash(req.body.password, salt);
			})
			.catch(err => console.error(err.message));
		req.body.password = hashedPWD;
		const user = new User(req.body);
		await user.save();
		global.loggedUser = user;
		res.status(201).send(global.loggedUser);
	}
	catch (error) {
		res.status(400).send(error);
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	}
	catch (error) {
		res.status(500).send(error);
	}
};