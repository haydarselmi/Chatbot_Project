const express = require('express');
const chatbotController = require('../controllers/chatbotController.js');

const router = express.Router();

// All the REST API routes for the chatbot ressource
router.post('/', chatbotController.createChatbot);
router.get('/:id', chatbotController.getChatbot);
router.get('/', chatbotController.getAllChatbots);
router.delete('/:id', chatbotController.deleteChatbot);
router.patch('/brains/:id', chatbotController.patchAddChatbotBrains);

router.get('/options/brains', chatbotController.getAllBrains);
router.get('/mouth/:id', chatbotController.socketMouthToChatbot);
// router.post('/mouth/message/:id', chatbotController.messageChatbot);

module.exports = router;