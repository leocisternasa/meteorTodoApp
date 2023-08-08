import React, { useState, Fragment } from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection.js";
import TaskForm from "../ui/TaskForm.jsx";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm.jsx";
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userID: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(hideCompleted ? pendingOnlyFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(pendingOnlyFilter).count();
  });
  const pendingTasksTitle = `${
    pendingTasksCount ? `(${pendingTasksCount})` : ""
  }`;

  const logout = () => Meteor.logout();
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
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              Log out: {user.username || user.profile.name}
            </div>
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All Tasks" : "Hide Completed Tasks"}
              </button>
            </div>

            <ul className="tasks">
              {tasks.length == 0 ? (
                <h3>
                  Felicidades, ya puedes comenzar a agregar tus tareas
                  pendientes
                </h3>
              ) : (
                tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckBoxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))
              )}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
