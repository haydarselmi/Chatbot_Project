const Profile = require('../models/profile.js');
const UserParam = require('../models/userParam.js');

/**
 * Creates a Profile with no user parameters with the given userId.
 * @param {} userId
 * @returns
 */
exports.createProfile = async (req, res)=> {
	try {
		const param = new UserParam({
			parameter_name: 'isAdmin',
			parameter_value: global.loggedUser[0].isAdmin == true ? 'true' : 'false',
		});
		await param.save();
		const profile = new Profile({
			user_id: global.loggedUser[0]._id,
			user_params: [param],
		});
		await profile.save();
		return profile;
	}
	catch (error) {
		console.error('Cannot create in the database the Profile');
	}
};

/**
 * Gets the Profile of the given ID.
 * Sends bach the Profile object if found.
 * @param {*} req
 * @param {*} res
 */
exports.getProfile = async (req, res) => {
	try {
		const profile = await profile.find({ _id: req.params.id });
		if (profile.length != 0) {
			res.status(200).send(profile);
		}
		else {
			res.status(400).send(`The profile of the given ID ${req.body.profileId} doesn't exist`);
		}
	}
	catch (error) {
		res.status(400).send(error);
	}
};
/**
 * Patches the  profile
 * @param {*} req
 * @param {*} res
 */
exports.patchProfile = async (req, res) => {
	try {
		let profile = await Profile.findOne({ _id: req.params.id });
		const userParams = Object.values(profile.user_params);
		profile.push(req.body.userParams);
		await Profile.updateOne({ _id: req.params.id, user_params: userParams });
		profile = await Profile.findOne({ _id: req.params.id });
		res.status(200).send(profile);
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Deletes the profile of the given ID.
 * Sends back a notification message if deleted successfully.
 * @param {*} req
 * @param {*} res
*/
exports.deleteProfile = async (req, res) => {
	try {
		await Profile.deleteOne({ _id: req.params.id });
		res.status(200).send(`profile of the given ${req.params.id} has been deleted`);
	}
	catch (error) {
		res.status(400).send(error);
	}
};

/**
 * Gets all the profiles in the database.
 * @param {*} req
 * @param {*} res
 */
exports.getAllProfiles = async (req, res) => {
	try {
		const profiles = await Profile.find();
		res.status(200).send(profiles);
	}
	catch (error) {
		res.status(500).send(error);
	}
};