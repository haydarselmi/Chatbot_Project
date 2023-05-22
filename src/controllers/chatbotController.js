const Chatbot = require('../models/chatbot.js');
const profileController = require('./profileController.js');

/**
 * Creates a chatbot with a given name with the standard brain.
 * The Profile included is juste a bare minimum profile containing
 * only the userId without user parameters as the chatbot is just
 * being created.
 * @param {*} req
 * @param {*} res
 */
exports.createChatbot = async (req, res) => {
	try {
		console.log(global.loggedUser);
		if (global.loggedUser != null && global.loggedUser.isAdmin != false) {
			console.log(req.body);
			const profile = await profileController.createProfile(req.body.userId);
			const chatbot = new Chatbot({
				name: req.body.chatbot_name,
				brains_paths: ['standard.rive'],
				profiles: [profile],
			});
			await chatbot.save();
			res.status(200).send(chatbot);
		}
		else {
			res.status(400).send('Can\'t create the chatbot if not logged with an admin account');
		}
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Gets the chatbot of the given ID.
 * Sends bach the chatbot object if found.
 * @param {*} req
 * @param {*} res
 */
exports.getChatbot = async (req, res) => {
	try {
		const chatbot = await Chatbot.find({ _id: req.params.id });
		if (chatbot.length != 0) {
			res.status(200).send(chatbot);
		}
		else {
			res.status(400).send(`The chatbot of the given ID ${req.body.chatbotId} doesn't exist`);
		}
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Deletes the chatbot of the given ID.
 * Sends back a notification message if deleted successfully.
 * @param {*} req
 * @param {*} res
*/
exports.deleteChatbot = async (req, res) => {
	try {
		await Chatbot.deleteOne({ _id: req.params.id });
		res.status(200).send(`Chatbot of the given ${req.params.id} has been deleted`);
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Patches the brains of the Chatbot
 * by adding a new brain path into the brains of the chatbot
 * of the given ID.
 * @param {*} req
 * @param {*} res
 */
exports.patchAddChatbotBrains = async (req, res) => {
	try {
		let chatbot = await Chatbot.findOne({ _id: req.params.id });
		const brains = Object.values(chatbot.brains_paths);
		brains.push(req.body.brain);
		await Chatbot.updateOne({ _id: req.params.id, brains_paths: brains });
		chatbot = await Chatbot.findOne({ _id: req.params.id });
		res.status(200).send(chatbot);
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Gets all the chatbots in the database.
 * @param {*} req
 * @param {*} res
 */
exports.getAllChatbots = async (req, res) => {
	try {
		const chatbots = await Chatbot.find();
		res.status(200).send(chatbots);
	}
	catch (error) {
		res.status(500).send(error);
	}
};