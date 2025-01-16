import { MdDelete, MdEdit, MdOutlineDone, MdClose } from "react-icons/md";
import React, { useContext, useState } from "react";
import "./TaskCard.css";
import { deleteone, updateone } from "../requests";
import { ThemeContext } from "../contexts";
const TaskCard = ({ task }) => {
  const { goal, _id, completed } = task;
  const [updating, setUpdating] = useState(false);
  const [updatedvalue, setUpdatedvalue] = useState(goal);
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`task-container${(theme==='dark')?'-dark':''}`}>
      {!updating ? (
        <div className={`taskgoal${completed ? "-completed" : ""}${(theme==='dark')?'-dark':''}`}>{goal}</div>
      ) : (
        <div className={`taskgoal${(theme==='dark')?'-dark':''}`}>
          {" "}
          <input
            className={`taskupdate${(theme==='dark')?'-dark':''}`}
            value={updatedvalue}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await updateone(updatedvalue, _id);
                setUpdating((v) => !v);
              }
            }}
            onChange={(e) => setUpdatedvalue(e.target.value)}
          />
        </div>
      )}
      <div className="buttons">
        <MdDelete
          className={`button${(theme==='dark')?'-dark':''}`}
          onClick={async () => await deleteone(_id)}
        ></MdDelete>
        <MdEdit
          className={`button${(theme==='dark')?'-dark':''}`}
          onClick={() => {
            setUpdating((v) => !v);
          }}
        />
        {completed ? (
          <MdClose
            className={`button${(theme==='dark')?'-dark':''}`}
            onClick={async () => await updateone(goal, _id, !completed)}
          />
        ) : (
          <MdOutlineDone
            className={`button${(theme==='dark')?'-dark':''}`}
            onClick={async () => await updateone(goal, _id, !completed)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
