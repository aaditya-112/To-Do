const mongoose = require("mongoose");

const TodolistSchema = new mongoose.Schema({
    task:{
        type:String,
        require: true
    },
    completed:{
        type:Boolean,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
})

module.exports = mongoose.model("TodoList", TodolistSchema);