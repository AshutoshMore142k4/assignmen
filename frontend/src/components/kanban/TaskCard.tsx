import React, { useState } from 'react';
import { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  onDragStart: (task: Task) => void;
  priorityColor: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onDelete,
  onDragStart,
  priorityColor
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <div className="task-card-header">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className="edit-title"
            placeholder="Task title"
          />
          <div className="task-actions">
            <button onClick={handleSave} className="save-btn">💾</button>
            <button onClick={handleCancel} className="cancel-btn">❌</button>
          </div>
        </div>
        
        <textarea
          value={editData.description}
          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
          className="edit-description"
          placeholder="Task description"
          rows={3}
        />
        
        <div className="task-priority">
          <label>Priority:</label>
          <select
            value={editData.priority}
            onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as 'Low' | 'Medium' | 'High' }))}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="task-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button onClick={handleEdit} className="edit-btn" title="Edit task">✏️</button>
          <button onClick={handleDelete} className="delete-btn" title="Delete task">🗑️</button>
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-meta">
        <div className="task-priority-badge" style={{ backgroundColor: priorityColor }}>
          {task.priority}
        </div>
        
        {task.assignedUser && (
          <div className="task-assignee">
            👤 {task.assignedUser.username}
          </div>
        )}
        
        <div className="task-dates">
          <small>Created: {formatDate(task.createdAt)}</small>
          {task.updatedAt !== task.createdAt && (
            <small>Updated: {formatDate(task.updatedAt)}</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 