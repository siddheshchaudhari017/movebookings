import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
    try {
        const { genre, language, industry, search } = req.query;
        let query = { isActive: true };

        if (genre) query.genre = genre;
        if (language) query.language = language;
        if (industry) query.industry = industry;
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const movies = await Movie.find(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            Object.assign(movie, req.body);
            const updatedMovie = await movie.save();
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            movie.isActive = false; // Soft delete
            await movie.save();
            res.json({ message: 'Movie removed' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
