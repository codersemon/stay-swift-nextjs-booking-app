// dependencies
import AmenitiesFilter from "./filters/AmenitiesFilter";
import CategoryFilter from "./filters/CategoryFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import SortByPriceFilter from "./filters/SortByPriceFilter";

export const HotelFilters = ({category}) => {
  return (
    <div className="col-span-3 space-y-4">
      <SortByPriceFilter  />
      <PriceRangeFilter />
      <CategoryFilter category={category} />
      <AmenitiesFilter />
    </div>
  );
};
