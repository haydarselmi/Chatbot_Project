const Chatbot = require('../models/chatbot.js');
const profileController = require('./profileController.js');
const WebSocket = require('ws');
const RiveScript = require('rivescript');

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
		if (global.loggedUser != null && global.loggedUser.isAdmin != false) {
			const profile = await profileController.createProfile(global.loggedUser._id);
			const chatbot = new Chatbot({
				name: req.body.chatbot_name,
				brains_paths: ['brains/standard.rive'],
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
 * Handles the fetch of the requested chatbot from the database
 * then creates a Rivescript chatbot with the database chatbot stored brains the creates
 * a websocket server with a unused port, after websocket connection listens to messages
 * from client websocket and sends chatbot reply on socket.
 * Sends back to the client the chatPort of the socket and the chatbot ID.
 * @param {*} req
 * @param {*} res
 */
exports.socketMouthToChatbot = async (req, res) => {
	try {
		const chatbot = await Chatbot.findOne({ _id: req.params.id });
		const chatPort = global.firstUnusedPort;
		// Creating the rivescript bot
		global.loggedUser.bot = new RiveScript();
		global.loggedUser.bot.loadFile(chatbot.brains_paths).then(() => {
			// Now the replies must be sorted!
			global.loggedUser.bot.sortReplies();
		});
		if (chatbot != null) {
			const server = new WebSocket.Server({ port: chatPort });
			server.on('connection', socket => {
				socket.on('message', message => {
					global.loggedUser.bot.reply(global.loggedUser.username, message).then(function(reply) {
						socket.send(reply);
					});
				});
			});
			global.firstUnusedPort++;
			res.status(200).send({ chatbot: chatbot, port: chatPort, bot_id: req.params.id });
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