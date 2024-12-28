// dependency
import Gallery from "@/components/hotels/details/Gallery";
import Overview from "@/components/hotels/details/Overview";
import HotelCard from "@/components/hotels/HotelCard";
import { getHotelDetailsById } from "@/lib/queries";

const HotelDetailsPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  // get hotel data
  const hotelData = await getHotelDetailsById(id, checkin, checkout);

  return (
    <>
      <section className="py-4 mt-[100px] ">
        <div className="container">
          <HotelCard info={hotelData} checkin={checkin} checkout={checkout} />
        </div>
      </section>
      <Gallery gallery={hotelData?.gallery} />
      <Overview overview={hotelData?.overview} />
    </>
  );
};

export default HotelDetailsPage;
