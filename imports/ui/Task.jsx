import React from "react";

function Task({ task, onCheckBoxClick, onDeleteClick }) {
  const { text } = task;
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckBoxClick(task)}
        readOnly
      />
      <span>{text}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
}

export default Task;
