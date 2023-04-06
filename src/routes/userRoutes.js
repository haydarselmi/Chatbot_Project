const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.verifyUserConnection);
router.get("/", userController.getAllUsers);

module.exports = router;