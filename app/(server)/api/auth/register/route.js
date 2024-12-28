// dependencies
import { userModel } from "@/models/userModel";
import connectMongoDB from "@/service/connectMongoDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  // get payload
  const { fname, lname, email, password } = await request.json();

  try {
    // connect db
    await connectMongoDB();

    // prepare user data
    const userData = {
      name: `${fname} ${lname}`,
      email,
      password,
    };

    // save new user data to db
    await userModel.create(userData);

    // send response
    return new NextResponse("Registration successful!", { status: 201 });
  } catch (error) {
    // send error response
    return new NextResponse(error.message, { status: 500 });
  }
};
