import mongoose, { Schema, Document } from 'mongoose';

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

const taskSchema = new Schema<ITaskDocument>({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    unique: true,
    trim: true,
    minlength: [1, 'Task title cannot be empty'],
    maxlength: [100, 'Task title cannot exceed 100 characters'],
    validate: {
      validator: function(title: string) {
        const columnNames = ['Todo', 'In Progress', 'Done'];
        return !columnNames.includes(title);
      },
      message: 'Task title cannot match column names'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: {
      values: ['Todo', 'In Progress', 'Done'],
      message: 'Status must be Todo, In Progress, or Done'
    },
    default: 'Todo'
  },
  priority: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Priority must be Low, Medium, or High'
    },
    default: 'Medium'
  },
  lastEditedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Increment version on update
taskSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.version += 1;
  }
  next();
});

// Create indexes
taskSchema.index({ title: 1 }, { unique: true });
taskSchema.index({ status: 1 });
taskSchema.index({ assignedUser: 1 });
taskSchema.index({ lastEditedBy: 1 });

export const Task = mongoose.model<ITaskDocument>('Task', taskSchema); 
 