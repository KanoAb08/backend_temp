import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
// import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

router.post('/logout',logoutUser);

// Protected Route Example (Uncomment if needed)
// router.get('/profile', protect, (req, res) => {
//   res.json({ message: 'Profile data' });
// });

export default router;
