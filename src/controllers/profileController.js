const Profile = require('../models/profile.js');

/**
 * Creates a Profile with no user parameters with the given userId.
 * @param {} userId
 * @returns
 */
exports.createProfile = async (userId) => {
	try {
		const profile = new Profile({ user_id: userId, user_params: {} });
		await profile.save();
		return profile;
	}
	catch (error) {
		console.error('Cannot create in the database the Profile');
	}
};