const mongoose = require('mongoose');
const UserParam = require('./userParam.js');

const profileSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.ObjectId,
		required: true,
	},
	user_params: {
		type: [UserParam.schema],
	},
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;