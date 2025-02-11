import express from 'express';
import { getAllTravelRequests, getDashboardData } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', getDashboardData);
router.get('/all-requests', getAllTravelRequests);

export default router;
