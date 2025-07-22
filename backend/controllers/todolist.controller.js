const TodoListModel = require("../model/todo.model");

const createTask = async(req, res)=>{
    const {task, completed} = req.body;
    const user = req.user.id;
    const todoTask = new TodoListModel({
        task,
        completed,
        user
    });
    try {
        const newtask = await todoTask.save();
        res.status(200).json({message:"task created", newtask});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"task not created"});
    };
};
const getAlltask = async(req, res)=>{
    try {
        const list = await TodoListModel.find({user : req.user.id})
        res.status(200).json({message:"got todo list", list });
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error in finding todo-list"});
    };
};

const updatetask = async(req, res)=>{
    try {
        const update= await TodoListModel.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        })
         res.status(200).json({message:"updated todo task", update});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error in updating todo-list"});
    };
};

const deletetask = async(req, res)=>{
    try {
       const todo= await TodoListModel.findByIdAndDelete(req.params.id)

       if(!todo){
        res.status(404).json({massage:"task not found"});
       }

        res.status(200).json({message:"deleted todo task" });
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error in deleting todo-task"});
    }
}


module.exports= {createTask , getAlltask , updatetask , deletetask};