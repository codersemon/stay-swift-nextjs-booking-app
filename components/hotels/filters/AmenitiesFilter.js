const AmenitiesFilter = () => {
  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="wifi">
          <input type="checkbox" name="wifi" id="wifi" className="mr-1" />
          Wi-fi
        </label>
        <label htmlFor="swimmingPool">
          <input type="checkbox" name="swimmingPool" id="swimmingPool" className="mr-1" />
          Swimming Pool
        </label>
      </form>
    </div>
  );
};

export default AmenitiesFilter;
