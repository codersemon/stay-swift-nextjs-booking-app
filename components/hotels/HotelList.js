// dependencies
import { getAllHotels } from "@/lib/queries";
import HotelCard from "./HotelCard";

const HotelList = async ({ destination, checkin, checkout, category }) => {
  // get all hotels data
  const hotelsData = await getAllHotels(
    destination,
    checkin,
    checkout,
    category
  );

  return (
    <div className="col-span-9">
      {/* Card Container */}
      <div className="space-y-4">
        {hotelsData?.map((info) => (
          <HotelCard
            key={info?.id}
            info={info}
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
