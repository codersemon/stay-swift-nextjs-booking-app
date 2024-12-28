// dependencies
import { getHotelNameByHotelId } from "@/lib/queries";
import { getDayDifference } from "@/utils/data-util";

const BookingCard = async ({ booking, fromPastBooking }) => {
  const hotelName = await getHotelNameByHotelId(booking?.hotelId);
  return (
    <div
      className={`${
        fromPastBooking ? "bg-[#ebf6e9]" : "bg-[#F6F3E9]"
      } p-4 rounded-md`}
    >
      <div className="flex justify-between items-center ">
        <div>
          <h3 className="text-xl font-semibold">{hotelName}</h3>
          <div className="text-sm text-gray-600 my-4">
            <p>Check In: {booking?.checkin}</p>
            <p>Check Out: {booking?.checkout}</p>
          </div>
        </div>
        {/* Total Cost */}
        <div>
          <h3 className="text-xl font-semibold text-right">
            ${booking?.amount}
          </h3>
          <p className="text-sm text-gray-600">
            ${booking?.basePrice} per night x{" "}
            {getDayDifference(booking?.checkin, booking?.checkout)} day(s)
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
