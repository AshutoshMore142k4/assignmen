import mongoose, { Schema, Document } from 'mongoose';

export interface IActionLogDocument extends Document {
  userId: mongoose.Types.ObjectId;
  action: 'create' | 'update' | 'delete' | 'assign' | 'move';
  resourceType: 'task' | 'user';
  resourceId: mongoose.Types.ObjectId;
  details: Record<string, any>;
  timestamp: Date;
}

const actionLogSchema = new Schema<IActionLogDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: {
      values: ['create', 'update', 'delete', 'assign', 'move'],
      message: 'Action must be create, update, delete, assign, or move'
    },
    required: true
  },
  resourceType: {
    type: String,
    enum: {
      values: ['task', 'user'],
      message: 'Resource type must be task or user'
    },
    required: true
  },
  resourceId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Create indexes for efficient querying
actionLogSchema.index({ timestamp: -1 }); // For getting latest actions
actionLogSchema.index({ userId: 1, timestamp: -1 }); // For user-specific actions
actionLogSchema.index({ resourceType: 1, resourceId: 1 }); // For resource-specific actions

export const ActionLog = mongoose.model<IActionLogDocument>('ActionLog', actionLogSchema); 