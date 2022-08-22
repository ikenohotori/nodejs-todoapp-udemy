const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "タスク名を入れてください。"],
        trim: true,
        maxlength:[20,"タスクは20文字以内で入力してください"]
    },
    completed: {
        type:Boolean,
        default:false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);