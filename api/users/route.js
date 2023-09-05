import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//get request function
export async function GET(request) {
  let users = [];
  try {
    await connectDB();
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed To Get Users",
      success: false,
    });
  }
  return NextResponse.json(users);
}

//post request function
//data post
export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();

  //create user object with user model

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });

  try {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    console.log(user);
    await connectDB();
    const createdUser = await user.save();

    const responce = NextResponse.json(user, {
      status: 201,
    });

    return responce;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed To Create User",
        status: false,
      },
      {
        status: 500,
      }
    );
  }

  // const body = request.body;
  // console.log(body)
  // console.log(request.method)
  // console.log(request.cookies)
  // console.log(request.headers)
  // console.log(request.nextUrl.pathname)
  // console.log(request.nextUrl.searchParams)

  // const jsonData = await request.json()
  // const textData = await request.text()
  // console.log(jsonData)
  // console.log(textData)

  // return NextResponse.json({
  //   message:'Hosting User Data'
  // })
}
