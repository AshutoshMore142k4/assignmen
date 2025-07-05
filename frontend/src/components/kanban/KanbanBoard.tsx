import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import './KanbanBoard.css';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignedUser?: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  lastEditedBy?: {
    _id: string;
    username: string;
  };
  version: number;
}

const KanbanBoard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'Todo', title: 'To Do', color: '#e3f2fd' },
    { id: 'In Progress', title: 'In Progress', color: '#fff3e0' },
    { id: 'Done', title: 'Done', color: '#e8f5e8' }
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockTasks: Task[] = [
        {
          _id: '1',
          title: 'Design User Interface',
          description: 'Create wireframes and mockups for the new dashboard',
          status: 'Todo',
          priority: 'High',
          assignedUser: { _id: '1', username: 'John Doe' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        },
        {
          _id: '2',
          title: 'Implement Authentication',
          description: 'Set up JWT authentication and user management',
          status: 'In Progress',
          priority: 'High',
          assignedUser: { _id: '2', username: 'Jane Smith' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        },
        {
          _id: '3',
          title: 'Write Documentation',
          description: 'Create comprehensive API documentation',
          status: 'Done',
          priority: 'Medium',
          assignedUser: { _id: '1', username: 'John Doe' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        }
      ];
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt' | 'version'>) => {
    try {
      // TODO: Replace with actual API call
      const newTask: Task = {
        ...taskData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      };
      setTasks(prev => [...prev, newTask]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      // TODO: Replace with actual API call
      setTasks(prev => prev.map(task => 
        task._id === taskId 
          ? { ...task, ...updates, updatedAt: new Date().toISOString(), version: task.version + 1 }
          : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      // TODO: Replace with actual API call
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      handleUpdateTask(draggedTask._id, { status: status as 'Todo' | 'In Progress' | 'Done' });
    }
    setDraggedTask(null);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#f44336';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#757575';
    }
  };

  if (loading) {
    return (
      <div className="kanban-loading">
        <div className="loading-spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <div className="header-content">
          <h1>📋 Real-Time Collaborative To-Do Board</h1>
          <div className="header-actions">
            <span className="user-info">
              Welcome, <strong>{user?.username}</strong>!
            </span>
            <button 
              className="add-task-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              ➕ Add Task
            </button>
            <button className="logout-btn" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="kanban-board">
        {columns.map(column => (
          <div 
            key={column.id}
            className="kanban-column"
            style={{ backgroundColor: column.color }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header">
              <h2>{column.title}</h2>
              <span className="task-count">{getTasksByStatus(column.id).length}</span>
            </div>
            
            <div className="column-content">
              {getTasksByStatus(column.id).map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  onDragStart={handleDragStart}
                  priorityColor={getPriorityColor(task.priority)}
                />
              ))}
              
              {getTasksByStatus(column.id).length === 0 && (
                <div className="empty-column">
                  <p>No tasks here</p>
                  <small>Drag tasks here or add new ones</small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddTaskModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard; 