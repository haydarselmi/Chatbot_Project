const User = require('../models/user.js');

exports.verifyUserConnection = async (req, res) => {
	try {
		const user = await User.find({ username: req.body.username, password: req.body.password });
		if (user.length != 0) {
			res.render('chatbotPanel');
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
		const user = new User(req.body);
		await user.save();
		res.status(201).send(user);
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