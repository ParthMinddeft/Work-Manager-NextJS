import { NextResponse } from "next/server";

export async function POST(request) {
  const responce = NextResponse.json({
    message: "Logged out",
    success: true,
  });
  responce.cookies.set("loginToken", "", {
    expires: new Date(0),
  });
  return responce;
}
