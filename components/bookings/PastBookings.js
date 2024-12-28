// dependencies
import { getBookingsByUserId } from "@/lib/queries";
import BookingCard from "./BookingCard";

const PastBookings = async ({ userId }) => {
  // get booking data
  const bookings = await getBookingsByUserId(userId);

  // past bookings
  const pastBookings = bookings?.filter(
    (booking) => new Date(booking?.checkin).getTime() < Date.now()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>
      {pastBookings?.map((booking) => (
        <BookingCard
          key={booking?.id}
          booking={booking}
          fromPastBooking={true}
        />
      ))}
    </div>
  );
};

export default PastBookings;
