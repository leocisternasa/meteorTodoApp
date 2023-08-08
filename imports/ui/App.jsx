import React from "react";
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
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Todo App with Meteor!</h1>
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />

        <ul>
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
