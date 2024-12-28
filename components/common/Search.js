// directives
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const destinationArray = [
  "Puglia",
  "Catania",
  "Frejus",
  "Calvi",
  "Paris",
  "Cergy",
  "Saint-Denis",
  "Le Pré-Saint-Gervais",
  "Karlovasi",
  "Kerkira",
];

const Search = ({ fromList, destination, checkin, checkout }) => {
  // init required hook
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // search form state
  const [searchTerm, setSearchTerm] = useState({
    destination: destination ?? "",
    checkin: checkin ?? "",
    checkout: checkout ?? "",
  });

  // search button disable state
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);

  // handle search input change
  const handleSearchInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const newTerm = { ...searchTerm, [name]: value };

    // if checkout date is smaller than checkin, disabled search button state
    if (
      new Date(newTerm?.checkin).getTime() >
      new Date(newTerm?.checkout).getTime()
    ) {
      setIsSearchDisabled(true);
    } else {
      setIsSearchDisabled(false);
    }

    setSearchTerm(newTerm);
  };

  // handle search
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm?.destination);

    if (searchTerm?.checkin && searchTerm?.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    if (pathname?.includes("hotels")) {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push(`${pathname}hotels?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList ? "!shadow-none" : ""}>
          {/*Location  */}
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                onChange={handleSearchInputChange}
                value={searchTerm?.destination}
              >
                <option value="">-Select-</option>
                {destinationArray?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </h4>
          </div>
          {/* Guests */}
          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                onChange={handleSearchInputChange}
                value={searchTerm?.checkin}
              />
            </h4>
          </div>
          {/* Check in */}
          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                onChange={handleSearchInputChange}
                value={searchTerm?.checkout}
              />
            </h4>
          </div>
        </div>
      </div>
      {/* Search Button */}
      <button
        className="search-btn"
        disabled={isSearchDisabled}
        onClick={handleSearch}
      >
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
