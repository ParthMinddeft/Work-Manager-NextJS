//api/tasks/{taskid}

import { getResponceMessage } from "@/helper/responceMessage"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export async function GET(request,{params}) {
  const {taskid} = params
  try {
    const task = Task.findById(taskid)
    return NextResponse.json(task)
  } catch (error) {
    console.log(error)
    return getResponceMessage(
      'Error in getting data!!',
      404,
      false
    )
  }
} 

export async function PUT(request,{params}) {
  try {
    const {taskid} = params
    const {title,content,status} = await request.json()
    let task = await Task.findById(taskid)
    task.title=title,
    task.content=content,
    task.status=status

    const updatedTask = await task.save();
    return NextResponse.json(updatedTask)
  } catch (error) {
    console.log(error)
    return getResponceMessage(
      'Error in updating task!!',
      500,
      false
    )
  }
}

export async function DELETE(request,{params}) {
  try {
    const {taskid} = params
    await Task.deleteOne({
      _id:taskid
    })
    return getResponceMessage(
      'Task Deleted',
      200,
      true
    )
  } catch (error) {
    console.log(error)
    return getResponceMessage(
      'Error In Deleting Task',
      500,
      false
    )
  }
}