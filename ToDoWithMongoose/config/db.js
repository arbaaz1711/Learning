const mongoose = require('mongoose');

// MongoDB connection configuration
const connectDB = async () => {
  try {
    // You can replace this with process.env.MONGODB_URI when using .env file
    const uri = "mongodb+srv://arbaazkhan:arbaaz1711@mycluster.egx9e.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=myCluster";
    
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
