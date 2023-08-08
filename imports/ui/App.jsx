import React, { useState } from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection.js";
import TaskForm from "../ui/TaskForm.jsx";
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );
  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );
  const pendingTasksTitle = `${
    pendingTasksCount ? `(${pendingTasksCount})` : ""
  }`;
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Todo App with Meteor!</h1>
            <h2>Tareas Pendientes: {pendingTasksTitle}</h2>
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All Tasks" : "Hide Completed Tasks"}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckBoxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
