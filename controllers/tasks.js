const Task = require('../models/tasks')


const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({});
       res.status(200).json({tasks})
    } catch(error){
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) =>{
    //We using try catch because if the validation in task.js in models(Schema) throwas an exception we
    //need to catch and so the response accordingly
    try{
        const {name , completed} = req.body
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(error){
        res.status(404).json({msg: error})
    }
}


const getTask = async (req, res) =>{
    try{
        const {id : taskID} = req.params;
        const task = await Task.findOne({_id : taskID});
        if(!task){
            return res.status(404).json({msg: 'No task with this'})
        }
        res.status(200).json({
         task
        })
     } catch(error){
         res.status(404).json({msg: error})
     }
}


const updateTask = async(req, res) =>{
    try{
        const {id : taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!task){
            return res.status(500).json({error: `No such task with id: ${taskID}`})
        }
        res.status(201).json({task})

    } catch(error){
        res.status(404).json({msg: error})
    }
    
}


const deleteTask = async (req, res) =>{
   try{
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID});
    if(!task){
        return res.status(404).json({msg: 'No task with this'})
    }
    res.status(200).json({task})
   } catch(error){
    res.status(404).json({msg: error})
   }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}