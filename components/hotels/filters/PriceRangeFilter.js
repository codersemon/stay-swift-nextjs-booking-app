const PriceRangeFilter = () => {
  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input type="checkbox" name="range1" id="range1" className="mr-1" />$
          13 - $ 30
        </label>
        <label htmlFor="range2">
          <input type="checkbox" name="range2" id="range2" className="mr-1" />$
          30 - $ 60
        </label>
        <label htmlFor="range3">
          <input type="checkbox" name="range3" id="range3" className="mr-1" />$
          60 - $ 97
        </label>
        <label htmlFor="range3">
          <input type="checkbox" name="range3" id="range3" className="mr-1" />$
          97 - $ 152
        </label>
        <label htmlFor="range4">
          <input type="checkbox" name="range4" id="range4" className="mr-1" />$
          152 - $ 182
        </label>
        <label htmlFor="range5">
          <input type="checkbox" name="range5" id="range5" className="mr-1" />$
          182+
        </label>
      </form>
    </div>
  );
};

export default PriceRangeFilter;
