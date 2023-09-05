import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

export async function POST(request) {
  //console.log("login api")
  const { email, password } = await request.json();
  try {
    //get user
    await connectDB();
    const user = await User.findOne({
      email: email,
    });
    if (user == null) {
      throw new Error("user not found");
    }
    //password check
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password not matched");
    }
    //generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    //create nextresponse --cookie
    const responce = NextResponse.json({
      message: "Login Success",
      success: true,
      user: user,
    });

    responce.cookies.set("loginToken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    console.log(user);
    console.log(token);
    return responce;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
