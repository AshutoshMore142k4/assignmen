import { AuthService } from '../services/authService.js';
import { registerSchema, loginSchema } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
export class AuthController {
    static async register(req, res) {
        try {
            // Validate request data
            const { error, value } = registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.details[0].message
                    }
                });
            }
            const result = await AuthService.register(value);
            res.status(201).json({
                success: true,
                data: result,
                message: 'User registered successfully'
            });
        }
        catch (error) {
            logger.error('Registration controller error', error);
            res.status(400).json({
                success: false,
                error: {
                    code: 'REGISTRATION_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async login(req, res) {
        try {
            // Validate request data
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.details[0].message
                    }
                });
            }
            const result = await AuthService.login(value);
            res.status(200).json({
                success: true,
                data: result,
                message: 'Login successful'
            });
        }
        catch (error) {
            logger.error('Login controller error', error);
            res.status(401).json({
                success: false,
                error: {
                    code: 'LOGIN_ERROR',
                    message: error.message
                }
            });
        }
    }
}
//# sourceMappingURL=authController.js.map