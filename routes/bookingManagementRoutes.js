import express from 'express';
import { pendingRequests, changeRequestStatus } from '../controllers/bookingManagementController.js';

const router = express.Router();

router.post('/', changeRequestStatus); // Protect route with authMiddleware
router.get('/', pendingRequests); // Protect route with authMiddleware

export default router;