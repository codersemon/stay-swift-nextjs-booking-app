import { bookingModel } from "@/models/bookingModel";
import connectMongoDB from "@/service/connectMongoDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  // getting payloads
  const { name, email, checkin, checkout, userId, hotelId, amount, basePrice } =
    await request.json();

  try {
    // setup db connection
    await connectMongoDB();

    // save booking data in db
    await bookingModel.create({
      name,
      email,
      checkin,
      checkout,
      userId,
      hotelId,
      amount,
      basePrice,
    });

    // send response
    return new NextResponse("Booking success", { status: 201 });
  } catch (error) {
    // send response
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
