import { getRatingByHotelId } from "@/lib/queries";

const Rating = async ({ hotelId }) => {
  // get ratings data
  const ratings = await getRatingByHotelId(hotelId);

  // average rating
  let avgRating = 0;

  if (ratings.length === 1) {
    avgRating = ratings[0].rating;
  }
  if (ratings.length > 1) {
    avgRating =
      ratings.reduce((item, currentValue) => {
        return item.rating + currentValue.rating;
      }) / ratings.length;
  }

  // get rating description
  const getRatingDescription = (avgRating) => {
    if (avgRating === 0) {
      return "No Ratings Available";
    } else if (avgRating > 0 && avgRating <= 2) {
      return "Poor";
    } else if (avgRating > 2 && avgRating <= 3) {
      return "Average";
    } else if (avgRating > 3 && avgRating <= 4) {
      return "Good";
    } else if (avgRating > 4) {
      return "Very Good";
    }
  };

  return (
    <>
      <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
        {avgRating}
      </div>
      <span className="font-medium">{getRatingDescription(avgRating)}</span>
    </>
  );
};

export default Rating;
