const User = require('../models/user.js');

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

exports.createUser = async (req, res) => {
	try {
		req.body.isAdmin = false;
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