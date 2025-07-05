import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { logger } from '../utils/logger.js';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export class AuthService {
    static generateToken(userId) {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    static async register(userData) {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ email: userData.email }, { username: userData.username }]
            });
            if (existingUser) {
                throw new Error('User with this email or username already exists');
            }
            // Create new user
            const user = new User(userData);
            await user.save();
            // Generate token
            const token = this.generateToken(user._id.toString());
            logger.info('User registered successfully', { userId: user._id });
            return {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            };
        }
        catch (error) {
            logger.error('Registration failed', error);
            throw error;
        }
    }
    static async login(loginData) {
        try {
            // Find user by email
            const user = await User.findOne({ email: loginData.email });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // Check password
            const isPasswordValid = await user.comparePassword(loginData.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            // Generate token
            const token = this.generateToken(user._id.toString());
            logger.info('User logged in successfully', { userId: user._id });
            return {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                },
                token
            };
        }
        catch (error) {
            logger.error('Login failed', error);
            throw error;
        }
    }
}
//# sourceMappingURL=authService.js.map