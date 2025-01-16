import { Task } from "./database.js";

const getAll = async() => {return await Task.find()};

const getById = async (id) => {
    try {
        const task = await Task.findById(id);
        return task; // Assuming Task.findById returns the document or null if not found
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        throw error; // Propagate the error to the caller
    }
};


const create = async(goal) => {
    const task = new Task({goal,completed:false})
    await task.save()
    return task
};

const updateById = async (id, goal,completed) => Task.findOneAndUpdate({ _id:id }, {goal:goal,completed:completed}, { new: true })


const deleteById = async (id) => Task.deleteOne({_id:id})

export { getAll, getById, create, updateById, deleteById };

  