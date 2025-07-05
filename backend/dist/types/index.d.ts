import { Request } from 'express';
export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ITask {
    _id: string;
    title: string;
    description?: string;
    assignedUser?: string;
    status: 'Todo' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    createdAt: Date;
    updatedAt: Date;
    lastEditedBy: string;
    version: number;
}
export interface IActionLog {
    _id: string;
    userId: string;
    action: 'create' | 'update' | 'delete' | 'assign' | 'move';
    resourceType: 'task' | 'user';
    resourceId: string;
    details: Record<string, any>;
    timestamp: Date;
}
export interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        username: string;
        email: string;
    };
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}
export interface CreateTaskRequest {
    title: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
}
export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    assignedUser?: string;
    status?: 'Todo' | 'In Progress' | 'Done';
    priority?: 'Low' | 'Medium' | 'High';
    version: number;
}
export interface ConflictData {
    taskId: string;
    userVersion: ITask;
    serverVersion: ITask;
}
//# sourceMappingURL=index.d.ts.map