const express = require('express');
const profileController = require('../controllers/profileController.js');

const router = express.Router();

// All the REST API routes for the profile ressource
router.post('/', profileController.createProfile);
router.get('/:id', profileController.getProfile);
router.get('/', profileController.getAllProfiles);
router.delete('/:id', profileController.deleteProfile);
router.patch('/profile/:id', profileController.patchAddProfile);

module.exports = router;