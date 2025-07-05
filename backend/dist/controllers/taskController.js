import { TaskService } from '../services/taskService.js';
import { createTaskSchema, updateTaskSchema } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
export class TaskController {
    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json({
                success: true,
                data: tasks,
                message: 'Tasks retrieved successfully'
            });
        }
        catch (error) {
            logger.error('Get tasks controller error', error);
            res.status(500).json({
                success: false,
                error: {
                    code: 'FETCH_ERROR',
                    message: 'Failed to fetch tasks'
                }
            });
        }
    }
    static async createTask(req, res) {
        try {
            const { error, value } = createTaskSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.details[0].message
                    }
                });
            }
            const task = await TaskService.createTask(value, req.user._id);
            res.status(201).json({
                success: true,
                data: task,
                message: 'Task created successfully'
            });
        }
        catch (error) {
            logger.error('Create task controller error', error);
            res.status(400).json({
                success: false,
                error: {
                    code: 'CREATE_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async updateTask(req, res) {
        try {
            const { error, value } = updateTaskSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: error.details[0].message
                    }
                });
            }
            const { taskId } = req.params;
            const result = await TaskService.updateTask(taskId, value, req.user._id);
            if (result.conflict) {
                return res.status(409).json({
                    success: false,
                    error: {
                        code: 'CONFLICT_ERROR',
                        message: 'Version conflict detected',
                        details: result.conflict
                    }
                });
            }
            res.status(200).json({
                success: true,
                data: result.task,
                message: 'Task updated successfully'
            });
        }
        catch (error) {
            logger.error('Update task controller error', error);
            res.status(400).json({
                success: false,
                error: {
                    code: 'UPDATE_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            const task = await TaskService.deleteTask(taskId, req.user._id);
            res.status(200).json({
                success: true,
                data: task,
                message: 'Task deleted successfully'
            });
        }
        catch (error) {
            logger.error('Delete task controller error', error);
            res.status(400).json({
                success: false,
                error: {
                    code: 'DELETE_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async smartAssign(req, res) {
        try {
            const { taskId } = req.params;
            const task = await TaskService.smartAssign(taskId, req.user._id);
            res.status(200).json({
                success: true,
                data: task,
                message: 'Task smart assigned successfully'
            });
        }
        catch (error) {
            logger.error('Smart assign controller error', error);
            res.status(400).json({
                success: false,
                error: {
                    code: 'SMART_ASSIGN_ERROR',
                    message: error.message
                }
            });
        }
    }
    static async getActionLogs(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 20;
            const logs = await TaskService.getActionLogs(limit);
            res.status(200).json({
                success: true,
                data: logs,
                message: 'Action logs retrieved successfully'
            });
        }
        catch (error) {
            logger.error('Get action logs controller error', error);
            res.status(500).json({
                success: false,
                error: {
                    code: 'FETCH_ERROR',
                    message: 'Failed to fetch action logs'
                }
            });
        }
    }
}
//# sourceMappingURL=taskController.js.map