const mongoose = require('mongoose');
const Profile = require('./profile.js');

// Creates the Chatbot Schema in the MongoDB database
const chatbotSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	brains_paths: {
		type: [String],
		required: true,
	},
	profiles: {
		type: [Profile.schema],
		required: true,
	},
});

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

module.exports = Chatbot;