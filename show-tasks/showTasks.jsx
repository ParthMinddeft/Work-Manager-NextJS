"use client";
import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  async function loadTasks(userid) {
    try {
      const tasks = await getTasksOfUser(userid);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(taskid) {
    try {
      const result = await deleteTask(taskid);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id != taskid);
      setTasks(newTasks);
      toast.success("Your Task Is Deleted", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error In Deleting Task", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-3">Your Tasks ({tasks.length})</h1>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
