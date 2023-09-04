"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    //temp solution
    userid: "64e74dbebf7c55e01fd6873b",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);
    //validate task data
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your Task Is Added", {
        position: "top-center",
      });
      setTask({
        title: "",
        content: "",
        status: "none",
      });
    } catch (error) {
      console.log(error),
        toast.error("Your Task Is Not Added", {
          position: "top-center",
        });
    }
  };

  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-sm">
        <div className="my-8 flex justify-center">
          <Image
            src={loginSvg}
            style={{
              width: "50%",
            }}
            alt="Login Banner Image"
          />
        </div>
        <h1 className="text-3xl text-center">Add Your Task Here</h1>
        <form action="#!" onSubmit={handleAddTask}>
          {/* task title */}
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          {/* task content */}
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>
          {/* task status */}
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="task_status"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {/* button action */}
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">
              Add Task
            </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
