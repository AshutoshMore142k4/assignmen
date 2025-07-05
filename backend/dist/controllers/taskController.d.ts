import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index';
export declare class TaskController {
    static getAllTasks(req: AuthenticatedRequest, res: Response): Promise<void>;
    static createTask(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateTask(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteTask(req: AuthenticatedRequest, res: Response): Promise<void>;
    static smartAssign(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getActionLogs(req: AuthenticatedRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=taskController.d.ts.map