const mongoose = require('moongoose');
const UserParam = require('userParam.js');

const profileSchema = new mongoose.Schema({
	user_id: {
		type: Number,
		required: true,
	},
	user_params: {
		type: [UserParam],
	},
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;