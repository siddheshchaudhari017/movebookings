import Theatre from '../models/Theatre.js';
import Show from '../models/Show.js';

// --- Theatre Controllers ---

export const getTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find({ isActive: true });
        res.json(theatres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTheatre = async (req, res) => {
    try {
        const theatre = new Theatre(req.body);
        const createdTheatre = await theatre.save();
        res.status(201).json(createdTheatre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Show Controllers ---

export const getShowsByMovie = async (req, res) => {
    try {
        const { date } = req.query;
        let query = { movie: req.params.movieId };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        } else {
            query.date = { $gte: new Date().setHours(0, 0, 0, 0) };
        }

        const shows = await Show.find(query).populate('theatre');
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createShow = async (req, res) => {
    try {
        const show = new Show(req.body);
        const createdShow = await show.save();
        res.status(201).json(createdShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getShowById = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id).populate('movie').populate('theatre');
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show) {
            Object.assign(show, req.body);
            const updatedShow = await show.save();
            res.json(updatedShow);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show) {
            await Show.deleteOne({ _id: req.params.id });
            res.json({ message: 'Show removed' });
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
