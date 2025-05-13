// server.js

// Import the necessary modules
const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDB, getCollection } = require("./config/db"); // Import db connection and collection getter

// Function to get all data (tasks) from the 'tasks' collection
const getData = async () => {
  // Get the collection from db.js
  const collection = getCollection();

  // Fetch all tasks using a cursor
  const cursor = await collection.find({});
  let tasks = [];

  // Iterate over the cursor to gather all tasks
  for await (const doc of cursor) {
    tasks.push(doc);
  }
  return tasks; // Return the list of tasks
};

// Function to create a new task in the 'tasks' collection
const createData = async (task, priority) => {
  // Get the collection from db.js
  const collection = getCollection();

  // Create a new document for the task
  const doc = { task, priority };

  // Insert the document into the collection
  const result = await collection.insertOne(doc);

  return result; // Return the result of the insert operation
};

// Initialize the express app
var app = express();
// Set the server's port
const port = "8000";

// Set up middleware for handling view rendering and form data
app.set("view engine", "ejs"); // Use EJS templating engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data (form submissions)
app.use(express.static("public")); // Serve static files like CSS, images, etc.
app.use(express.json()); // Middleware to parse JSON body data

let listItems = []; // Array to hold the list of tasks (not used directly)

app.get("/", async (req, res) => {
  // When the root route is accessed, fetch all tasks and render the index page
  const tasksList = await getData();

  if (tasksList) {
    // Render the index.ejs page with the fetched tasks
    res.render("index", { todoList: tasksList });
  }
});

// Handle POST requests to add a new task
app.post("/", async (req, res) => {
  let { task, priority } = req.body; // Extract task and priority from request body

  if (req.body.task.trim() === "") {
    // If the task is empty, fetch the tasks and show an error message
    const tasksList = await getData();
    res.render("index", { todoList: tasksList, error: "Task cannot be empty" });
  } else {
    // Otherwise, create a new task and redirect to the home page
    const result = await createData(task, priority);
    const listt = await getData();
    listItems.push({ task: req.body.task, priority: req.body.priority });
    res.redirect("/"); // Redirect to the home page after adding the task
  }
});

// Handle POST requests to delete a task
app.post("/delete", async (req, res) => {
  const index = req.body.taskId; // Get the task ID to delete
  const objectId = ObjectId.createFromHexString(index); // Convert the ID to ObjectId

  if (index) {
    // If a valid index is provided, attempt to delete the task from the collection
    const collection = getCollection(); // Get the collection
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }

    res.redirect("/"); // Redirect to the home page after deletion
  } else {
    // If no valid index was provided, return a 400 error
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});

// Handle PUT requests to update a task
app.put("/:index", async (req, res) => {
  try {
    // Get the updated task details from the request body and the task ID from the URL
    const editedTask = req.body;
    const index = req.params.index; // Get the task index (id) from URL params
    const objectId = ObjectId.createFromHexString(index); // Convert string ID to ObjectId

    const filter = { _id: objectId }; // MongoDB filter to find the document by ID
    const updateDocument = {
      $set: { task: editedTask.value }, // Prepare the update document to change the task field
    };

    // Get the collection from db.js and attempt to update the document
    const collection = getCollection();
    const result = await collection.updateOne(filter, updateDocument);

    if (result.modifiedCount === 0) {
      // If no document was modified, send a failure response
      return res.status(404).json({
        Success: false,
        message: "No change was made.",
      });
    }

    // If update was successful, send a success response
    res.status(200).json({
      Success: true,
      message: "Task updated successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Success: false,
      message: "An error occurred while updating the task.",
    });
  }
});

// Start the express server and connect to MongoDB
app.listen(port, async () => {
  // Ensure that the database connection is established before starting the server
  await connectToDB();
  console.log("Wohoo!!! Server started"); // Log server startup
});
