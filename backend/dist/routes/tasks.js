import { Router } from 'express';
import { TaskController } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth';
const router = Router();
// Apply authentication middleware to all task routes
router.use(authenticateToken);
// Task CRUD operations
router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.put('/:taskId', TaskController.updateTask);
router.delete('/:taskId', TaskController.deleteTask);
// Smart assign
router.post('/:taskId/smart-assign', TaskController.smartAssign);
// Action logs
router.get('/actions/logs', TaskController.getActionLogs);
export default router;
//# sourceMappingURL=tasks.js.map