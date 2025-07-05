import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Access token is required'
                }
            });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Invalid token'
                }
            });
            return;
        }
        req.user = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Invalid token'
            }
        });
    }
};
//# sourceMappingURL=auth.js.map