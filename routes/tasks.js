const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.use(authMiddleware);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
