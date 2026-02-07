// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory data store (instead of a database)
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a REST API', completed: false }
];

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
