import express from 'express';
import { sendMessage, clearChat, getSuggestedQuestions } from '../controllers/chatbotController.js';

const router = express.Router();

//Send message to chatbot
router.post('/message', sendMessage);

//Clear chat history
router.post('/clear', clearChat);

//Get suggested questions
router.get('/suggestions', getSuggestedQuestions);

export default router;
