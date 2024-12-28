import { auth } from "@/auth";
import PastBookings from "@/components/bookings/PastBookings";
import UpcomingBookings from "@/components/bookings/UpcomingBookings";
import User from "@/components/bookings/User";
import { getUserByEmail } from "@/lib/queries";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  // get session
  const session = await auth();

  // send login page if not logged in
  if (!session) {
    return redirect("/login");
  }

  // get user details
  const user = await getUserByEmail(session?.user?.email);

  return (
    <>
      <User />

      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PastBookings userId={user?.id} />
            <UpcomingBookings userId={user?.id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingsPage;
