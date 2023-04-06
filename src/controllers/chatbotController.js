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
		const profile = profileController.createProfile(req.body.userId);
		const chatbot = new Chatbot({
			name: req.body.name,
			brains: 'standard.rive',
			profiles: [profile],
		});
		await chatbot.save();
		res.status(200).send(chatbot);
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
		const chatbot = await Chatbot.find({ _id: req.body.chatbotId });
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