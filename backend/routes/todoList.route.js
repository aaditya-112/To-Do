const express = require("express");
const {createTask , getAlltask, updatetask, deletetask} = require("../controllers/todolist.controller")
const authUser = require("../middleware/authUser");
const router = express.Router();

router.post("/addTask",authUser, createTask);
router.get("/getTask",authUser, getAlltask);
router.put("/updateTask/:id",authUser, updatetask);
router.delete("/deleteTask/:id",authUser, deletetask);

module.exports = router;