import { getResponceMessage } from "@/helper/responceMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//get all the task
export async function GET(request) {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return getResponceMessage("Error in getting data!!", 404, false);
  }
}

//create all the task
export async function POST(request) {
  const { title, content, userid, status } = await request.json();

  // fetching logged in user id
  const loginToken = request.cookies.get("loginToken")?.value;
  // console.log(loginToken);
  const data = jwt.verify(loginToken, process.env.JWT_KEY);
  console.log(data._id);

  try {
    const task = new Task({
      title,
      content,
      userid: data._id,
      status,
    });
    const createdTask = await task.save();
    return NextResponse.json(createdTask, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return getResponceMessage("Error in getting data!!", 500, false);
  }
}
