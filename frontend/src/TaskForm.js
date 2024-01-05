import "./index.css";
import React from "react";

const TaskForm = ({ createTask, name, handleInputChange, isEditing, updateTask }) => {
  return (
    <div>
      <div className="form">
        <form className="form" action="" method="post" onSubmit={isEditing ? updateTask : createTask}>
          <input
            className="input"
            type="text"
            placeholder="Add a Task"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
