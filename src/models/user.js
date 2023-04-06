const mongoose = require('mongoose');

// Creates The user Schema in the MangoDB chatbot database
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;

