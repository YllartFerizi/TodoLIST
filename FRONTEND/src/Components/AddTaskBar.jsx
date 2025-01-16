import React, { useContext, useState } from "react";
import "./addtaskbar.css";
import { addone } from "../requests.js";
import { ThemeContext } from "../contexts.js";

const AddTaskBar = () => {
  const {theme} = useContext(ThemeContext)
  const [task, setTask] = useState("");
  return (
    <div className={`addtaskbar${(theme==='dark')?'-dark':''}`}>
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onKeyDown={async (e) => {
          if(e.key==='Enter'){
            await addone(task)
            setTask('')
          }
        }}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={async () => {
          await addone(task);
        }}
      >
        Add a task
      </button>
    </div>
  );
};

export default AddTaskBar;
