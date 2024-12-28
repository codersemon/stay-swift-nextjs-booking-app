// dependencies
import { getReviewsByHotelId } from "@/lib/queries";
import Link from "next/link";

const Reviews = async ({ hotelId }) => {
  const reviews = await getReviewsByHotelId(hotelId);

  return (
    <>
      {reviews?.length === 0 ? (
        <Link href="#" className="underline">
          Be the first one to review
        </Link>
      ) : (
        <Link href={`/hotel/${hotelId}/reviews`} className="underline">
          {reviews.length} Reviews
        </Link>
      )}
    </>
  );
};

export default Reviews;
