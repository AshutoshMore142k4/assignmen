import Joi from 'joi';
export const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters',
        'any.required': 'Username is required'
    }),
    email: Joi.string()
        .email()
        .required()
        .messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string()
        .required()
        .messages({
        'any.required': 'Password is required'
    })
});
export const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
        'string.min': 'Task title cannot be empty',
        'string.max': 'Task title cannot exceed 100 characters',
        'any.required': 'Task title is required'
    }),
    description: Joi.string()
        .max(500)
        .optional()
        .messages({
        'string.max': 'Description cannot exceed 500 characters'
    }),
    priority: Joi.string()
        .valid('Low', 'Medium', 'High')
        .optional()
        .messages({
        'any.only': 'Priority must be Low, Medium, or High'
    })
});
export const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .optional()
        .messages({
        'string.min': 'Task title cannot be empty',
        'string.max': 'Task title cannot exceed 100 characters'
    }),
    description: Joi.string()
        .max(500)
        .optional()
        .messages({
        'string.max': 'Description cannot exceed 500 characters'
    }),
    assignedUser: Joi.string()
        .optional(),
    status: Joi.string()
        .valid('Todo', 'In Progress', 'Done')
        .optional()
        .messages({
        'any.only': 'Status must be Todo, In Progress, or Done'
    }),
    priority: Joi.string()
        .valid('Low', 'Medium', 'High')
        .optional()
        .messages({
        'any.only': 'Priority must be Low, Medium, or High'
    }),
    version: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
        'number.base': 'Version must be a number',
        'number.integer': 'Version must be an integer',
        'number.min': 'Version must be at least 1',
        'any.required': 'Version is required for conflict resolution'
    })
});
//# sourceMappingURL=validation.js.map