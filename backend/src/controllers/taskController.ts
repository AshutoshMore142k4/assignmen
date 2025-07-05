import { Response } from 'express';
import { TaskService } from '../services/taskService';
import { createTaskSchema, updateTaskSchema } from '../utils/validation';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types/index';

export class TaskController {
  static async getAllTasks(req: AuthenticatedRequest, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      
      res.status(200).json({
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully'
      });
    } catch (error: any) {
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

  static async createTask(req: AuthenticatedRequest, res: Response) {
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

      const task = await TaskService.createTask(value, req.user!._id);
      
      res.status(201).json({
        success: true,
        data: task,
        message: 'Task created successfully'
      });
    } catch (error: any) {
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

  static async updateTask(req: AuthenticatedRequest, res: Response) {
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
      const result = await TaskService.updateTask(taskId, value, req.user!._id);
      
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
    } catch (error: any) {
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

  static async deleteTask(req: AuthenticatedRequest, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await TaskService.deleteTask(taskId, req.user!._id);
      
      res.status(200).json({
        success: true,
        data: task,
        message: 'Task deleted successfully'
      });
    } catch (error: any) {
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

  static async smartAssign(req: AuthenticatedRequest, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await TaskService.smartAssign(taskId, req.user!._id);
      
      res.status(200).json({
        success: true,
        data: task,
        message: 'Task smart assigned successfully'
      });
    } catch (error: any) {
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

  static async getActionLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const logs = await TaskService.getActionLogs(limit);
      
      res.status(200).json({
        success: true,
        data: logs,
        message: 'Action logs retrieved successfully'
      });
    } catch (error: any) {
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