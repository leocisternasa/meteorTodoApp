import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

function TaskForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    Meteor.call("tasks.insert", text);

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
