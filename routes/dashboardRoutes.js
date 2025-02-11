import express from 'express';
import { getAllTravelRequests, getDashboardData } from '../controllers/dashboardController.js';
import { isAdmin, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, isAdmin, getDashboardData);
router.get('/all-requests', protect, isAdmin, getAllTravelRequests);

export default router;
