# Todo App with Mongoose

A full-stack Todo application built with Node.js, Express, MongoDB, and Mongoose. This project demonstrates a complete MVC (Model-View-Controller) architecture with RESTful API endpoints.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, Delete todos
- **Priority Levels**: Set todo priorities (low, medium, high)
- **Due Dates**: Add optional due dates to todos
- **Completion Tracking**: Mark todos as completed/incomplete
- **Responsive UI**: Modern, responsive web interface
- **RESTful API**: Complete API with JSON responses
- **Error Handling**: Comprehensive error handling middleware
- **Data Validation**: Mongoose schema validation
- **Request Logging**: HTTP request logging middleware

## 📁 Project Structure

```
ToDoWithMongoose/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── todoController.js     # Business logic for todo operations
├── middleware/
│   ├── errorHandler.js       # Global error handling middleware
│   └── logger.js             # HTTP request logging middleware
├── models/
│   └── Todo.js               # Mongoose todo schema and model
├── Routes/
│   └── todoRoutes.js         # API routes for todo endpoints
├── views/
│   └── index.ejs             # EJS template for frontend
├── public/                   # Static files (CSS, JS, images)
├── node_modules/             # Dependencies
├── package.json              # Project configuration and dependencies
├── package-lock.json         # Dependency lock file
├── server.js                 # Main application entry point
└── README.md                 # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account or local MongoDB installation
- npm (comes with Node.js)

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd ToDoWithMongoose
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - The MongoDB connection string is currently hardcoded in `config/db.js`
   - For production, create a `.env` file and use environment variables:
   ```
   NODE_ENV=production
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the application**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with nodemon)
   npm run dev
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`
   - API documentation is available at `http://localhost:8000/api`

## 🔌 API Endpoints

### Base URL: `/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update existing todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle todo completion status |

### Example API Usage

#### Create a new todo:
```bash
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Mongoose",
    "description": "Complete the Mongoose tutorial",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

#### Get all todos:
```bash
curl http://localhost:8000/api/todos
```

#### Update a todo:
```bash
curl -X PUT http://localhost:8000/api/todos/:id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated todo title",
    "completed": true
  }'
```

## 📊 Data Schema

### Todo Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## 🎨 Frontend Features

- **Modern UI**: Bootstrap 5 with custom styling
- **Interactive Forms**: Add todos with priority and due dates
- **Real-time Updates**: Dynamic todo list updates
- **Priority Badges**: Visual priority indicators
- **Responsive Design**: Works on desktop and mobile

## 🚦 Scripts

- `npm start` - Start the application in production mode
- `npm run dev` - Start the application in development mode with nodemon
- `npm test` - Run tests (currently not implemented)

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5, Vanilla JavaScript
- **Tools**: Nodemon for development

## 📝 Notes

- The project includes comprehensive error handling and validation
- All API responses follow a consistent JSON structure
- The frontend provides a complete todo management interface
- Middleware includes request logging and global error handling

## 🚀 Getting Started

1. Make sure MongoDB is running (Atlas or local)
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Open `http://localhost:8000` in your browser
5. Start creating todos!

## 📋 Todo Schema Validation

The application includes robust validation:
- Title is required and limited to 100 characters
- Description is optional but limited to 500 characters
- Priority must be one of: 'low', 'medium', 'high'
- Dates are automatically managed for creation and updates
