
const express =require("express")
const Task = require("../models/taskModel");
const { createTask, readTasks, readTask, deleteTask, updateTask } = require("../controllers/taskController");

const router = express.Router()

router.post("/", createTask)
router.get("/", readTasks)
router.get("/:id", readTask)
router.delete("/:id", deleteTask)
router.get("/:id", readTask)
router.put("/:id", updateTask)

module.exports = router