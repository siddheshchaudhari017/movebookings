import express from 'express';
import {
    getTheatres,
    createTheatre,
    getShowsByMovie,
    createShow,
    getShowById,
    updateShow,
    deleteShow
} from '../controllers/theatreController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/theatres', getTheatres);
router.post('/theatres', protect, admin, createTheatre);

router.get('/shows/movie/:movieId', getShowsByMovie);
router.get('/shows/:id', getShowById);
router.post('/shows', protect, admin, createShow);
router.put('/shows/:id', protect, admin, updateShow);
router.delete('/shows/:id', protect, admin, deleteShow);

export default router;
