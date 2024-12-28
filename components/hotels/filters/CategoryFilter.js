// directives
"use client";

// dependencies
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// star array
const starCategory = [1, 2, 3, 4, 5];

const CategoryFilter = () => {
  // hooks init
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // selected star state
  const [selected, setSelected] = useState([]);

  // handle input change
  const handleInputChange = (e) => {
    // get input name & checked/unchecked value
    const name = e.target.name;
    const checked = e.target.checked;

    // calculate the next state
    let nextState;
    if (checked) {
      nextState = [...selected, name];
      setSelected(nextState);
    } else {
      nextState = selected?.filter((item) => item !== name);
      setSelected(nextState);
    }

    // update search params in url
    if (nextState?.length > 0) {
      params.set("category", encodeURI(nextState.join("|")));
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // sync state on reload page
  useEffect(() => {
    const category = params.get("category");
    setSelected(decodeURI(category).split("|"));
  }, []);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        {starCategory?.map((star) => (
          <label key={star} htmlFor={`star${star}`}>
            <input
              type="checkbox"
              name={star}
              id={`star${star}`}
              className="mr-1"
              checked={selected?.includes(star.toString())}
              onChange={handleInputChange}
            />
            {star} Star
          </label>
        ))}
      </form>
    </div>
  );
};

export default CategoryFilter;
