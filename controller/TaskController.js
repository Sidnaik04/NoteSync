import Task from "../model/Task.js";

export const createTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, userId: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error creating task" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};