const User = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.verifyUserConnection = async (req, res) => {
	try {
		const user = await User.find({ username: req.body.username });
		if (user.length != 0) {
			await bcrypt.compare(req.body.password, user[0].password, function(err, result) {
				if (result) {
					global.loggedUser = user;
					if (global.loggedUser.isAdmin != false) {
						fetch('http://localhost:3000/chatbots', { method: 'GET' })
							.then(response => response.json())
							.then(response => {
								res.render('chatbotPanel', { bots: response });
							});
					}
					else {
						res.render('chatbotMessenger');
					}
				}
				else {
					res.status(400).send('Wrong password');
				}
			});
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
		console.error('Email already used');
	}
};

exports.createUser = async (req, res) => {
	try {
		req.body.isAdmin = false;
		// Hasing password for storage
		const available = await this.verifyEmail(req.body.username);
		if (!available) {
			res.status(400).send('Email already used');
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