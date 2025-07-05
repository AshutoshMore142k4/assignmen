import mongoose, { Document } from 'mongoose';
export interface IActionLogDocument extends Document {
    userId: mongoose.Types.ObjectId;
    action: 'create' | 'update' | 'delete' | 'assign' | 'move';
    resourceType: 'task' | 'user';
    resourceId: mongoose.Types.ObjectId;
    details: Record<string, any>;
    timestamp: Date;
}
export declare const ActionLog: mongoose.Model<IActionLogDocument, {}, {}, {}, mongoose.Document<unknown, {}, IActionLogDocument> & IActionLogDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=ActionLog.d.ts.map