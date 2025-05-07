const express = require("express");
const router = express.Router();
const { getTasksByUserId, getTaskById, createTask, updateTask, deleteTask, toggleTaskStatus, deleteCompletedTasks } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/tasks/user/:user_id',authMiddleware, getTasksByUserId);
router.post('/tasks', authMiddleware,createTask);
router.put('/tasks/:task_id', authMiddleware,updateTask);
router.delete('/tasks/:task_id', authMiddleware,deleteTask);
router.patch('/tasks/:task_id/toggle-status', authMiddleware,toggleTaskStatus);
router.delete('/tasks/:user_id/deleteCompletedTasks', authMiddleware,deleteCompletedTasks);

module.exports = router;