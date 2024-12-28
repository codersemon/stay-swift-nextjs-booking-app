// dependencies
import { bookingModel } from "@/models/bookingModel";
import { hotelModel } from "@/models/hotelModel";
import { ratingModel } from "@/models/ratingModel";
import { reviewModel } from "@/models/reviewModel";
import { userModel } from "@/models/userModel";
import connectMongoDB from "@/service/connectMongoDB";
import {
  isDateInBetween,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

// get all hotels
export const getAllHotels = async (
  destination,
  checkin,
  checkout,
  category
) => {
  try {
    // connect mongo db
    await connectMongoDB();

    // destination regex
    const regex = new RegExp(destination, "i");

    // get hotels by destination
    const hotelsByDestination = await hotelModel
      .find({ city: { $regex: regex } })
      .select([
        "name",
        "highRate",
        "lowRate",
        "thumbNailUrl",
        "city",
        "propertyCategory",
      ])
      .lean();

    // create array from all hotels
    let allHotels = hotelsByDestination;

    // category filter
    if (category) {
      // create filtered categories array
      const categories = category.split("|");

      // filter hotels by propertyCategory
      allHotels = allHotels.filter((hotel) =>
        categories?.includes(hotel?.propertyCategory.toString())
      );
    }

    if (checkin && checkout) {
      allHotels = await Promise.all(
        allHotels?.map(async (hotel) => {
          // finding hotel already booked or not
          const found = await findBooking(hotel?._id, checkin, checkout);

          // if booking found with the checkin & checkout date
          if (found) {
            hotel["isBooked"] = true;
          } else {
            hotel["isBooked"] = false;
          }

          // return the updated hotel
          return hotel;
        })
      );
    }

    return replaceMongoIdInArray(allHotels);
  } catch (error) {
    throw Error("Something went wrong!");
  }
};

// check hotel already booked between checkin & checkout date
async function findBooking(hotelId, checkin, checkout) {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInBetween(checkin, match.checkin, match.checkout) ||
      isDateInBetween(checkout, match.checkin, match.checkout)
    );
  });

  return found;
}

// get hotel details by id
export const getHotelDetailsById = async (hotelId, checkin, checkout) => {
  try {
    // connect mongo db
    await connectMongoDB();

    const hotel = await hotelModel.findById(hotelId).lean();

    if (checkin && checkout) {
      const found = await findBooking(hotel._id, checkin, checkout);

      // if found in booking
      if (found) {
        hotel["isBooked"] = true;
      } else {
        hotel["isBooked"] = false;
      }
    }

    return replaceMongoIdInObject(hotel);
  } catch (error) {
    throw Error("Something went wrong!");
  }
};

// get ratings by hotel id
export const getRatingByHotelId = async (hotelId) => {
  try {
    // connect mongo db
    await connectMongoDB();

    const ratings = await ratingModel.find({ hotelId });

    return ratings;
  } catch (error) {
    throw Error("Something went wrong!");
  }
};

// get reviews by hotel id
export const getReviewsByHotelId = async (hotelId) => {
  try {
    // connect mongo db
    await connectMongoDB();

    const ratings = await reviewModel.find({ hotelId });

    return ratings;
  } catch (error) {
    throw Error("Something went wrong!");
  }
};

// get user by email
export const getUserByEmail = async (email) => {
  try {
    // connect db
    await connectMongoDB();

    // get user from db
    const user = await userModel.findOne({ email }).lean();

    // return user data
    return replaceMongoIdInObject(user);
  } catch (error) {
    throw Error(error.message);
  }
};

// get bookings by userId
export const getBookingsByUserId = async (userId) => {
  try {
    // connect db
    await connectMongoDB();

    // get user from db
    const bookings = await bookingModel.find({ userId }).lean();

    // return user data
    return replaceMongoIdInArray(bookings);
  } catch (error) {
    throw Error(error.message);
  }
};

// get hotel name by hotelId
export const getHotelNameByHotelId = async (hotelId) => {
  try {
    // connect mongo db
    await connectMongoDB();

    // get hotel data
    const data = await hotelModel
      .findOne({ _id: hotelId })
      .select("name")
      .lean();

    // destructure name
    const { name } = data;

    return name;
  } catch (error) {
    throw Error("Something went wrong!");
  }
};
