const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController');

// @route   GET /api/todos
// @desc    Get all todos
// @access  Public
router.get('/', getAllTodos);

// @route   GET /api/todos/:id
// @desc    Get single todo by ID
// @access  Public
router.get('/:id', getTodo);

// @route   POST /api/todos
// @desc    Create new todo
// @access  Public
router.post('/', createTodo);

// @route   PUT /api/todos/:id
// @desc    Update todo
// @access  Public
router.put('/:id', updateTodo);

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Public
router.delete('/:id', deleteTodo);

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Public
router.patch('/:id/toggle', toggleTodo);

module.exports = router; 