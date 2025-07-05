import { CreateTaskRequest, UpdateTaskRequest, ConflictData } from '../types/index';
export declare class TaskService {
    static getAllTasks(): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("../models/Task.js").ITaskDocument> & import("../models/Task.js").ITaskDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    static createTask(taskData: CreateTaskRequest, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/Task.js").ITaskDocument> & import("../models/Task.js").ITaskDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    static updateTask(taskId: string, updateData: UpdateTaskRequest, userId: string): Promise<{
        task: any;
        conflict?: ConflictData;
    }>;
    static deleteTask(taskId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/Task.js").ITaskDocument> & import("../models/Task.js").ITaskDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    static smartAssign(taskId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/Task.js").ITaskDocument> & import("../models/Task.js").ITaskDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    static getActionLogs(limit?: number): Promise<Omit<import("mongoose").Document<unknown, {}, import("../models/ActionLog.js").IActionLogDocument> & import("../models/ActionLog.js").IActionLogDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
//# sourceMappingURL=taskService.d.ts.map