import express from 'express';
import { sendSOSAlert } from '../controllers/sosController.js';

const router = express.Router();

// POST route for SOS alerts
router.post('/', sendSOSAlert);

export default router;</content>
<parameter name="filePath">c:\Users\aayuk\OneDrive\codinggg\DisasterMate\Backend\routes\sos.js