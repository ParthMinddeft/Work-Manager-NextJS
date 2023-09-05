import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDB } from "@/helper/db";

export async function GET(request) {
  const loginToken = request.cookies.get("loginToken")?.value;
  console.log(loginToken);
  const data = jwt.verify(loginToken, process.env.JWT_KEY);
  console.log(data);
  await connectDB();
  const user = await User.findById(data._id).select("-password");
  return NextResponse.json(user);
}
