const Task = require('../models/Task');

// Create a task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  const owner = req.user.userId;

  const task = new Task({ title, description, dueDate, status, priority, owner });
  await task.save();
  res.json(task);
};

// Get all tasks (with optional filters)
exports.getTasks = async (req, res) => {
  const owner = req.user.userId;
  const { status, dueDate, priority } = req.query;

  // build filter
  const filter = { owner };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (dueDate) {
    // you may want to parse dueDate and do range queries
    filter.dueDate = { $lte: new Date(dueDate) };
  }

  const tasks = await Task.find(filter).sort({ dueDate: 1 });
  res.json(tasks);
};

// Get single task
exports.getTask = async (req, res) => {
  const owner = req.user.userId;
  const task = await Task.findOne({ _id: req.params.id, owner });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

// Update task
exports.updateTask = async (req, res) => {
  const owner = req.user.userId;
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, owner },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  res.json(updated);
};

// Delete task
exports.deleteTask = async (req, res) => {
  const owner = req.user.userId;
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner });
  if (!deleted) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Deleted successfully' });
};
