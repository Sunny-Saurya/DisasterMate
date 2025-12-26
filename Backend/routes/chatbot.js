import express from 'express';
import { sendMessage, clearChat, getSuggestedQuestions } from '../controllers/chatbotController.js';

const router = express.Router();

// POST /api/chatbot/message - Send message to chatbot
router.post('/message', sendMessage);

// POST /api/chatbot/clear - Clear chat history
router.post('/clear', clearChat);

// GET /api/chatbot/suggestions - Get suggested questions
router.get('/suggestions', getSuggestedQuestions);

export default router;
