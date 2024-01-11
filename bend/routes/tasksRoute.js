const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTasks,
  deleteTasks,
  updateTask,
} = require("../controllers/tasksController");

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").get(getTaskById).delete(deleteTasks).patch(updateTask);

module.exports = router;
