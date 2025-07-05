import mongoose, { Document } from 'mongoose';
export interface ITaskDocument extends Document {
    title: string;
    description?: string;
    assignedUser?: mongoose.Types.ObjectId;
    status: 'Todo' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    lastEditedBy: mongoose.Types.ObjectId;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Task: mongoose.Model<ITaskDocument, {}, {}, {}, mongoose.Document<unknown, {}, ITaskDocument> & ITaskDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Task.d.ts.map