// dependencies
import { auth } from "@/auth";
import { PaymentForm } from "@/components/hotels/details/payment/PaymentForm";
import { getHotelDetailsById, getUserByEmail } from "@/lib/queries";
import { getDayDifference } from "@/utils/data-util";
import { redirect } from "next/navigation";

const PaymentPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  // get session
  const session = await auth();

  // send login page if not logged in
  if (!session) {
    return redirect("/login");
  }

  // getUser details 
  const user = await getUserByEmail(session?.user?.email);

  // get hotel details
  const hotelInfo = await getHotelDetailsById(id);
  const basePrice = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;
  const totalDays = getDayDifference(checkin, checkout);
  const totalAmount = totalDays * basePrice;

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo?.name}</b> and base price is $
          {basePrice}. You are going to pay <b>${totalAmount} for {totalDays} day(s).</b>
        </p>
        <PaymentForm
          name={session?.user?.name}
          email={session?.user?.email}
          userId = {user?.id}
          hotelId = {id}
          checkin={checkin}
          checkout={checkout}
          totalAmount={totalAmount}
          basePrice={basePrice}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
