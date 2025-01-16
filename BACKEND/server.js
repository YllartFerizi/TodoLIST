import express from "express";
import { getAll, getById, create, deleteById, updateById } from "./store.js";
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.send("<h1>The server is working</h1>");
});

app.get("/api/v1/todo", async( req,res) => {
    const data = await getAll();
    if(!data){
      return res.status(404).send({message:"No data found"})
    }
    res.json(data)
});

app.get("/api/v1/todo/:id", async( req,res) => {
  const id = req.params.id
  const task = await getById(id);
  if (!task){
    return res.status(404).send({message:"The id doesnt exist"})
  }
  res.send(task)
 });

app.post("/api/v1/todo", async(req,res) => {
    const goal = req.body.goal
    if(!goal && typeof(goal)!==String){
      return res.status(400).send({message:"Please enter a propper message"})
    }
    const task = await create(goal)
    res.send(task)
});

app.put("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id;
  const { goal,completed} = req.body;

  try {
    // Validate inputs
    if (!id || !goal) {
      return res.status(400).json({ error: "ID and goal are required" });
    }

    // Fetch the existing task
    const task = await getById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await updateById(id, goal, completed);

    // Respond with the updated task
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/v1/todo/:id", async (req,res) => {
  const id = req.params.id
  let task = undefined
  try{
    task = await getById(id);
  }catch{
    return res.status(400).json({ error: "Task not found" });
  }
  if(!task){
    return res.status(404).json({ error: "Task not found" });
  }
  await deleteById(id)
  res.status(201).send({message:"Deleted"})
});

export { app };
