import mongoose from "mongoose";
mongoose.set('toJSON',{
    virtuals:true,
    transform:(doc,converted)=>{
        delete converted.__v
        delete converted.id
    }
})
const taskSchema = new mongoose.Schema({
    goal: String,completed : Boolean})

const Task  = mongoose.model("Task",taskSchema);

export {Task}