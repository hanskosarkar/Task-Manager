const Task = require('../models/task');
const asyncWrapper = require('../middleware/async-wrapper');
const {createCustomError} = require('../errors/custom-errors');

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ status: "success", data: { tasks: tasks, size: tasks.length } });
})

const createTask = asyncWrapper( async (req, res) => {
    
    // Extract the required fields from the request body
    // const { name, completed } = req.body;
    const task = await Task.create(req.body);
    // Respond with the created task
    res.status(201).json({
        status: 201,
        success: true,
        message: "Task created successfully"
    });
})

const getTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
  
    res.status(200).json({ task })
})

const updateTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ msg: `No task found with id: ${taskID}` })
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findOneAndDelete({ _id: taskID });

        if (!task) {
            return res.status(404).json({ msg: `No task found with id: ${taskID}` });
        }

        res.status(200).json({
            task: null,
            success: true,
            status: 200,
            message: `Task with id: ${taskID} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}