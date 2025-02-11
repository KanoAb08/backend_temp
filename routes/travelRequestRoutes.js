import express from 'express';
import { createTravelRequest, getTravelRequestStatus } from '../controllers/travelRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTravelRequest); // Protect route with authMiddleware
router.get('/', authMiddleware, getTravelRequestStatus); // Protect route with authMiddleware

export default router;
