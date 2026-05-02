import express from 'express';
import { getTimeline, getSteps, getFaqs, postQuestion, postQuizResult, getPollingBooths, getAnalytics } from '../controllers/apiController.js';

const router = express.Router();

// Defined API routes
router.get('/timeline', getTimeline);
router.get('/steps', getSteps);
router.get('/faqs', getFaqs);
router.post('/questions', postQuestion);
router.post('/quiz-results', postQuizResult);
router.get('/polling-booths', getPollingBooths);
router.get('/analytics', getAnalytics);

export default router;
