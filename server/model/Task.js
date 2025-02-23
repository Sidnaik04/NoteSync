import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskName: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  priority: {
    level: { type: String, enum: ["high", "medium", "low"], required: true },
    mainGoal: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["done", "in-progress", "pending"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
