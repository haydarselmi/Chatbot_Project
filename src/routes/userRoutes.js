const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// All the REST API routes for the user ressource
// Route to verify if an email and password concerns a user
router.post('/', userController.verifyUserConnection);
// Route to create a non admin user
router.post('/new/', userController.createUser);
// Route that gets all the users
router.get('/', userController.getAllUsers);

module.exports = router;