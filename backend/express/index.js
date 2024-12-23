// Simple Task manager app

import 'dotenv/config'
import express from "express"; // import express

import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let taskData = [];
let nextId = 1;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// add task
app.post("/task", (req, res) => {
  const { name, description } = req.body;
  const newTask = { id: nextId++, name, description };
  taskData.push(newTask);
  res.status(201).send(newTask);
});

// get all tasks
app.get("/task", (req, res) => {
  res.status(200).send(taskData);
});

// get task with specific id
app.get("/task/:id", (req, res) => {
  const task = taskData.find((t) => t.id === parseInt(req.params.id));
  // validate
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.status(200).send(task);
});

// update task
app.put("/task/:id", (req, res) => {
  const task = taskData.find((t) => t.id === parseInt(req.params.id));
  // validate
  if (!task) {
    return res.status(404).send("Task not found");
  }

  const { name, description } = req.body;
  task.name = name;
  task.description = description;
  res.send(200).send(task);
});

// delete task
app.delete('/task/:id', (req, res) => {
    const index = taskData.findIndex(t => t.id === parseInt(req.params.id))
    // validate
    if (index === -1) {
        return res.status(404).send("Task not found")
    }
    taskData.splice(index, 1)
    return res.status(204).send(`task ${taskData[index]} has been deleted`)
})

// Run server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
