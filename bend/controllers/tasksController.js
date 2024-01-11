const { TasksModel } = require("../models/");

// get all task GET
const getAllTasks = async (req, res) => {
  try {
    const listOfTask = await TasksModel.findAll();
    res.status(200).json(listOfTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Problem" });
  }
};

// create new task POST
const createTasks = async (req, res) => {
  try {
    const newTask = await TasksModel.create({
      task: req.body.task,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get by id GET
const getTaskById = async (req, res) => {
  try {
    // const singleTask = await TasksModel.findAll({
    //   where: { id: req.params.id },
    // });
    const singleTaskid = req.params.id;
    const singleTask = await TasksModel.findByPk(singleTaskid);
    if (!singleTask) {
      return res.status(404).json({ error: "Task is Not Present" });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Problem" });
  }
};

// update the task PATCH
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedField = req.body;

    const task = await TasksModel.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.update(updatedField);
    res.status(200).json(updatedField);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Problem" });
  }
  res.json(req.body);
};

// delete the task DELETE
const deleteTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TasksModel.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task is already absent" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTasks,
  createTasks,
  updateTask,
  deleteTasks,
  getTaskById,
};
