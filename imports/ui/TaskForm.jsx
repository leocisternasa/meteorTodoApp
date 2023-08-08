import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

function TaskForm({ user }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id,
    });

    setText("");
  };
  return (
    <form action="" className="task-form">
      <input
        type="text"
        placeholder="Añade una nueva tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
