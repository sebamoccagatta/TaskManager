import express from "express";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
import bodyParser from "body-parser";
import { Task } from "./models/task.interface";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

/* instance and initialize local Storage */
const tasksLocal = new LocalStorage('./scratch');


app.get("/api/tasks", (req, res) => {
    const tasks = tasksLocal.getItem("tasks");

    if (!tasks) {
        tasksLocal.setItem("tasks", JSON.stringify({}));
    }

    const parsedTasks = JSON.parse(tasks || "{}");

    return res.status(200).json(Object.values(parsedTasks));
});

app.get("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    const tasks = JSON.parse(tasksLocal.getItem("tasks") || "{}");
    const task = tasks[id];
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
});

app.post("/api/tasks", (req, res) => {
    const { title, description, completed }: Task = req.body;

    console.log("Received task data:", req.body);
    

    if (!title || !description) {
        console.error("Missing required fields:", { title, description, completed });
        return res.status(400).json({ message: "Title and description are required" });
    }

    const tasks = JSON.parse(tasksLocal.getItem("tasks") || "{}");

    // Generate a unique ID for the new task
    const newId = Math.random().toString(36).substring(2, 15);
    const newTask: Task = {
        id: newId,
        title,
        description,
        completed,
        createdAt: new Date(),
    };

    tasks[newTask.id] = newTask;
    tasksLocal.setItem("tasks", JSON.stringify(tasks));

    return res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    const tasks = JSON.parse(tasksLocal.getItem("tasks") || "{}");
    const task = tasks[id];
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, completed }: Task = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    // Update the task
    task.title = title;
    task.description = description;
    task.completed = completed;

    tasks[id] = task;
    tasksLocal.setItem("tasks", JSON.stringify(tasks));

    return res.status(200).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }

    const tasks = JSON.parse(tasksLocal.getItem("tasks") || "{}");
    if (!tasks[id]) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    delete tasks[id];
    tasksLocal.setItem("tasks", JSON.stringify(tasks));

    return res.status(204).json({ message: "Task deleted successfully" });
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});