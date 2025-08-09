import express from 'express';

const userRoutes = express.Router();

userRoutes.get('/profile', (req, res) => {
    res.json({ success: true, message: 'User profile route' });
}); 