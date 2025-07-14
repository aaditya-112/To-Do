const mongoose = require("mongoose");

const TodolistSchema = new mongoose.Schema({
    task:{
        type:String,
        require: true
    },
    completed:{
        type:Boolean,
        require: true
    }
})

module.exports = mongoose.model("TodoList", TodolistSchema);