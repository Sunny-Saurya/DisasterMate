import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

// POST route for contact form
router.post('/', sendContactEmail);

export default router;
