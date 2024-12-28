// dependencies
import Search from "@/components/common/Search";
import { HotelFilters } from "@/components/hotels/HotelFilters";
import HotelList from "@/components/hotels/HotelList";

const HotelsPage = ({
  searchParams: { destination, checkin, checkout, category },
}) => {
  const decodedCategory = category === undefined ? "" : decodeURI(category);

  return (
    <>
      <section className="bg-[url('/assets/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container grid grid-cols-12">
          <HotelFilters  />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={decodedCategory}
          />
        </div>
      </section>
    </>
  );
};

export default HotelsPage;
