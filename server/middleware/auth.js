import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}
//controller to check if user is authenticated
export const isAuthenticated = (req, res) => {
  req.json({success: true, message: 'User is authenticated', user: req.user});
  
}
