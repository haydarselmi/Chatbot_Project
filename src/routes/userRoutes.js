const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// All the REST API routes for the user ressource
router.post('/', userController.verifyUserConnection);
router.get('/', userController.getAllUsers);

module.exports = router;