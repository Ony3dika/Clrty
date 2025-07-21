// backend/server.js
import express from "express";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
