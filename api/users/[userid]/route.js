import { User } from "@/models/user";
import { NextResponse } from "next/server";

// get user

export async function GET(request, { params }) {
  const { userid } = params;
  const user = await User.findById(userid).select("-password");
  return NextResponse.json(user);
}

// delete user
export async function DELETE(request, { params }) {
  const { userid } = params;
  try {
    await User.deleteOne({
      _id: userid,
    });
    return NextResponse.json({
      message: "user deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error in deleted user",
      success: false,
    });
  }
}

// update user
export async function PUT(request, { params }) {
  const { userid } = params;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user = await User.findById(userid);
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;
    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({
      message: "Failed To Update User!!",
      success: false,
    });
  }
}
