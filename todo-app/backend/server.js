// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task list
let todos = [];

// Get all tasks
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new task
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: Date.now(),  // unique ID
    task,
    done: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle task done/undone
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id == id ? { ...todo, done: !todo.done } : todo
  );
  res.json({ message: 'Updated' });
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ message: 'Deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
