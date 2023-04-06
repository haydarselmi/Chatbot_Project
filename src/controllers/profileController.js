const Profile = require('../models/profile.js');

/**
 * Creates a Profile with no user parameters with the given userId.
 * @param {} userId
 * @returns
 */
async function createProfile(userId) {
	try {
		const profile = new Profile({ user_id: userId });
		await profile.save();
		return profile;
	}
	catch (error) {
		console.error('Cannot create in the database the Profile');
	}
}

module.exports = { createProfile };