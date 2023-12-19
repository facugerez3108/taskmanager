import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const verifyResetToken = async (req, res, next) => {
    const token = req.params.token;

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }

        const userId = payload.id;

        if (typeof userId !== 'number') {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            req.userId = userId;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    });
}