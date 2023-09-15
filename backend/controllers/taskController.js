const Task = require("../models/task");

const getTasks = async(req,res)=>{
    const data = await Task.find({ user: req.user._id});
    res.json({tasks:data});
}

const getTask =  async(req,res) => {
    const taskId = req.params.id;
    const data = await Task.findOne({_id:taskId, user: req.user._id});
    res.json({singleTask:data});
}

const createTask = async(req,res) => {
    const task = req.body.task;
    const body = req.body.body;

    const data = await Task.create({
        task:task,
        body:body,
        user:req.user._id,
    });

    return res.json({task:data});
}

const updateTask = async(req,res) => {
    const taskId = req.params.id;
    const task = req.body.task;
    const body = req.body.body;

    await Task.findOneAndUpdate({ _id:taskId , user: req.user._id}, {
        task:task,
        body:body
    });

    //find updated task
    const data = await Task.findById(taskId);

    res.json({updatedTask : data});
}

const deleteTask = async(req,res) => {

    const taskId = req.params.id;
    await Task.deleteOne({taskId , user: req.user._id});
    res.json({message:"Deleted Successfully"})
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}