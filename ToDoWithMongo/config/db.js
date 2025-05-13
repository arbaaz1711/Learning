// db.js

// Import MongoDB client from the 'mongodb' package
const { MongoClient } = require("mongodb");

// MongoDB URI to connect to the cloud database (replace with your actual URI)
const uri =
  "mongodb+srv://arbaazkhan:arbaaz1711@mycluster.egx9e.mongodb.net/?retryWrites=true&w=majority&appName=myCluster";

// Initialize MongoClient with the connection URI
const client = new MongoClient(uri);

// Declare 'collection' variable, which will hold the MongoDB collection reference
let collection;

// Function to establish a connection to MongoDB and initialize 'collection'
async function connectToDB() {
  try {
    // Attempt to connect to MongoDB
    await client.connect();
    // Connect to the 'ToDo' database and get the 'tasks' collection
    const database = client.db("ToDo");
    collection = database.collection("tasks");
    console.log("Connected to MongoDB!"); // Log success message
  } catch (err) {
    console.error("Failed to connect to DB", err); // Log any connection errors
  }
}

// Export the connection function and a getter for the collection
module.exports = {
  connectToDB, // Function to initiate connection to DB
  getCollection: () => collection, // Getter for the 'collection' object
};
