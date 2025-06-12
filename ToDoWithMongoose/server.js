const express = require("express");
const path = require("path");

// Import database connection
const connectDB = require("./config/db");

// Import middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// // Import routes
const todoRoutes = require("./Routes/todoRoutes");

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/todos', todoRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.render('index', { title: 'Todo App with Mongoose' });
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'Todo API with Mongoose',
    version: '1.0.0',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/:id': 'Get single todo',
      'POST /api/todos': 'Create new todo',
      'PUT /api/todos/:id': 'Update todo',
      'DELETE /api/todos/:id': 'Delete todo',
      'PATCH /api/todos/:id/toggle': 'Toggle todo completion'
    }
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Wohoo!!! Server is running on port ${PORT}`);
});


