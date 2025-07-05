import mongoose, { Document } from 'mongoose';
export interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument> & IUserDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=User.d.ts.map