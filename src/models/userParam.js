const mongoose = require('moongoose');

const userParamSchema = new mongoose.Schema({
	parameter_name: {
		type: String,
		required: true,
	},
	parameter_value: {
		type: String,
		required: true,
	},
});

const UserParam = mongoose.model('UserParam', userParamSchema);

module.exports = UserParam;