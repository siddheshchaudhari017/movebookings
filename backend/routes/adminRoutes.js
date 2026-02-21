import express from 'express';
import { getAdminStats, getAllBookings, getAllShows } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/bookings', protect, admin, getAllBookings);
router.get('/shows', protect, admin, getAllShows);

export default router;
