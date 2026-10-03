import Task from '../models/Task.js';

// Create Task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = await Task.create({ title: title.trim(), description, status });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get all tasks 
export const getAllTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0; 
    const skip = limit > 0 ? (page - 1) * limit : 0;

    const tasks = await Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Get single task
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
