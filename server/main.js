import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/db/TasksCollection";
import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";
import "../imports/api/taskMethods";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "leocisal";
const SEED_PASSWORD = "123456";
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    // [
    //   "First Task",
    //   "Second Task",
    //   "Third Task",
    //   "Fourth Task",
    //   "Fifth Task",
    //   "Sixth Task",
    //   "Seventh Task",
    // ].forEach((taskText) => insertTask(taskText, user));
  } else {
    console.log("ya hay tareas");
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "708c4b6bd1f22d5f15e4",
      secret: "9c8556ab7e2bdfc51c1170f208217c0dff1c4a60",
    },
  }
);
