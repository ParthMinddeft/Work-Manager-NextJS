import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { User } from "@/models/user";

export async function GET(request) {
  const loginToken = request.cookies.get('loginToken')?.value;
  console.log(loginToken)
  const data = jwt.verify(loginToken,process.env.JWT_KEY)
  console.log(data)
  const user = await User.findById(data._id).select('-password')
  return NextResponse.json(user);
}