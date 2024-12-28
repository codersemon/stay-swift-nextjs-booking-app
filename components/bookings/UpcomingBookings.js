// dependencies
import { getBookingsByUserId } from "@/lib/queries";
import BookingCard from "./BookingCard";

const UpcomingBookings = async ({ userId }) => {
  // get booking data
  const bookings = await getBookingsByUserId(userId);

  // past bookings
  const upcomingBookings = bookings?.filter(
    (booking) => new Date(booking?.checkin).getTime() > Date.now()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcoming Bookings</h2>

      {upcomingBookings?.map((booking) => (
        <BookingCard key={booking?.id} booking={booking} />
      ))}
    </div>
  );
};

export default UpcomingBookings;
