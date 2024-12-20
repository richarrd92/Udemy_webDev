const fs = require("fs"); // Import the 'fs' module to work with the filesystem
const filePath = "./tasks.json"; // File to store tasks (automatically created if it doesn't exist)

// Function to load tasks from the JSON file
const loadTasks = () => {
  try {
    // Read the file content as a buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Convert the buffer to a string (JSON format)
    const dataJSON = dataBuffer.toString();

    // Parse the JSON string into a JavaScript object (array of tasks)
    return JSON.parse(dataJSON);
  } catch (error) {
    // If the file doesn't exist or there's an error, return an empty array
    return [];
  }
};

// Function to save tasks to the JSON file
const saveTasks = (tasks) => {
  // Convert the array of tasks to a JSON string
  const dataJSON = JSON.stringify(tasks);

  // Write the JSON string to the file
  fs.writeFileSync(filePath, dataJSON);
};

// Function to add a new task
const addTask = (task) => {
  const tasks = loadTasks(); // Load existing tasks from the file

  // Add the new task as an object with a "task" property
  tasks.push({ task });

  // Save the updated list of tasks back to the file
  saveTasks(tasks);

  // Log a success message to the terminal
  console.log("Task added ", task);
};

// Retrieve command and argument from command-line input
const command = process.argv[2]; // The first argument specifies the command (e.g., 'add', 'list', 'remove')
const argument = process.argv[3]; // The second argument provides additional input (e.g., task description or task number)

// Function to list all tasks
const listTasks = () => {
  const tasks = loadTasks(); // Load tasks from the file

  // Iterate over each task and print it with its number
  tasks.forEach(
    (task, index) => console.log(`${index + 1} - ${task.task}`) // Display the task number and its description
  );
};

// Function to remove a specific task by its number
const removeTask = (taskNumber) => {
  const tasks = loadTasks(); // Load tasks from the file

  // Validate the task number to ensure it's within the valid range
  if (taskNumber <= 0 || taskNumber > tasks.length) {
    console.log("Error - Invalid Number");
    return; // Exit the function if the input is invalid
  }

  // Remove the task from the array (adjust for 0-based index)
  tasks.splice(taskNumber - 1, 1); // Removes one task at the specified position

  // Save the updated list of tasks back to the file
  saveTasks(tasks);

  // Log a success message to the terminal
  console.log(`Task ${taskNumber} removed successfully.`);
};

// Handle commands entered via the terminal
if (command === "add") {
  addTask(argument); // Add a new task
} else if (command === "list") {
  listTasks(); // List all tasks
} else if (command === "remove") {
  removeTask(parseInt(argument)); // Remove a task (convert the input to a number)
} else {
  // Handle invalid or unrecognized commands
  console.log("Command not found!");
}
