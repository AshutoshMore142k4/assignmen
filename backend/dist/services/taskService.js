import { Task } from '../models/Task.js';
import { User } from '../models/User.js';
import { ActionLog } from '../models/ActionLog.js';
import { logger } from '../utils/logger.js';
export class TaskService {
    static async getAllTasks() {
        try {
            const tasks = await Task.find()
                .populate('assignedUser', 'username email')
                .populate('lastEditedBy', 'username')
                .sort({ createdAt: -1 });
            return tasks;
        }
        catch (error) {
            logger.error('Failed to get tasks', error);
            throw error;
        }
    }
    static async createTask(taskData, userId) {
        try {
            const task = new Task({
                ...taskData,
                lastEditedBy: userId
            });
            await task.save();
            // Log the action
            await ActionLog.create({
                userId,
                action: 'create',
                resourceType: 'task',
                resourceId: task._id,
                details: { title: task.title, status: task.status }
            });
            logger.info('Task created successfully', { taskId: task._id, userId });
            return task;
        }
        catch (error) {
            logger.error('Failed to create task', error);
            throw error;
        }
    }
    static async updateTask(taskId, updateData, userId) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            // Check for version conflict
            if (task.version !== updateData.version) {
                const conflictData = {
                    taskId: task._id.toString(),
                    userVersion: { ...updateData, _id: taskId },
                    serverVersion: task.toObject()
                };
                logger.warn('Version conflict detected', { taskId, userVersion: updateData.version, serverVersion: task.version });
                return { task: null, conflict: conflictData };
            }
            // Update task
            Object.assign(task, updateData);
            task.lastEditedBy = userId;
            await task.save();
            // Log the action
            await ActionLog.create({
                userId,
                action: 'update',
                resourceType: 'task',
                resourceId: task._id,
                details: { title: task.title, status: task.status }
            });
            logger.info('Task updated successfully', { taskId, userId });
            return { task };
        }
        catch (error) {
            logger.error('Failed to update task', error);
            throw error;
        }
    }
    static async deleteTask(taskId, userId) {
        try {
            const task = await Task.findByIdAndDelete(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            // Log the action
            await ActionLog.create({
                userId,
                action: 'delete',
                resourceType: 'task',
                resourceId: taskId,
                details: { title: task.title }
            });
            logger.info('Task deleted successfully', { taskId, userId });
            return task;
        }
        catch (error) {
            logger.error('Failed to delete task', error);
            throw error;
        }
    }
    static async smartAssign(taskId, userId) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            // Get all users and their active task counts
            const users = await User.find();
            const userTaskCounts = await Promise.all(users.map(async (user) => {
                const activeTaskCount = await Task.countDocuments({
                    assignedUser: user._id,
                    status: { $ne: 'Done' }
                });
                return { user, activeTaskCount };
            }));
            // Find user with minimum active tasks
            const userWithMinTasks = userTaskCounts.reduce((min, current) => current.activeTaskCount < min.activeTaskCount ? current : min);
            if (userWithMinTasks.user) {
                task.assignedUser = userWithMinTasks.user._id;
                task.lastEditedBy = userId;
                await task.save();
                // Log the action
                await ActionLog.create({
                    userId,
                    action: 'assign',
                    resourceType: 'task',
                    resourceId: task._id,
                    details: {
                        title: task.title,
                        assignedTo: userWithMinTasks.user.username,
                        reason: 'Smart assign - user had fewest active tasks'
                    }
                });
                logger.info('Task smart assigned', {
                    taskId,
                    assignedTo: userWithMinTasks.user.username,
                    activeTaskCount: userWithMinTasks.activeTaskCount
                });
            }
            return task;
        }
        catch (error) {
            logger.error('Smart assign failed', error);
            throw error;
        }
    }
    static async getActionLogs(limit = 20) {
        try {
            const logs = await ActionLog.find()
                .populate('userId', 'username')
                .sort({ timestamp: -1 })
                .limit(limit);
            return logs;
        }
        catch (error) {
            logger.error('Failed to get action logs', error);
            throw error;
        }
    }
}
//# sourceMappingURL=taskService.js.map