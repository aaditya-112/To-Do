const express = require("express");
const {createTask , getAlltask, updatetask, deletetask} = require("../controllers/todolist.controller")

const router = express.Router();

router.post("/addTask", createTask);
router.get("/getTask", getAlltask);
router.put("/updateTask/:id", updatetask);
router.delete("/deleteTask/:id", deletetask);

module.exports = router;