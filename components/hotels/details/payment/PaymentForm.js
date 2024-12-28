// directives
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const PaymentForm = ({
  name,
  email,
  checkin,
  checkout,
  totalAmount,
  userId,
  hotelId,
  basePrice,
}) => {
  // hooks init
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // checkin & checkout state
  const [duration, setDuration] = useState({
    name: name,
    email: email,
    checkin: checkin,
    checkout: checkout,
  });

  // checkout disabled state
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  // handle duration change
  const handleDurationChange = (e) => {
    // get name & value
    const name = e.target.name;
    const value = e.target.value;

    // prepare next duration object
    const nextDuration = { ...duration, [name]: value };

    // enable / disable checkout button state
    if (
      new Date(nextDuration?.checkin).getTime() >
      new Date(nextDuration?.checkout).getTime()
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    // prepare search params
    if (nextDuration?.checkin && nextDuration?.checkout) {
      const params = new URLSearchParams(searchParams);
      params.set("checkin", nextDuration?.checkin);
      params.set("checkout", nextDuration?.checkout);

      // push params in the url
      router.push(`${pathname}?${params.toString()}`);
    }

    // update duration state
    setDuration(nextDuration);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // get formdata
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const checkin = formData.get("checkin");
    const checkout = formData.get("checkout");

    try {
      // Send API request
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          checkin,
          checkout,
          hotelId,
          userId,
          basePrice,
          amount: totalAmount,
        }),
      });

      if (!res.ok) {
        setError(res.message);
      } else {
        router.push("/bookings");
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      {error && <p className="bg-red-400">{error}</p>}
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          value={name}
          name="name"
          onChange={handleDurationChange}
        />
      </div>
      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          value={email}
          name="email"
          onChange={handleDurationChange}
        />
      </div>
      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input
            type="date"
            name="checkin"
            id="checkin"
            value={duration?.checkin}
            onChange={handleDurationChange}
          />
        </h4>
      </div>
      {/* Check in */}
      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input
            type="date"
            name="checkout"
            id="checkout"
            value={duration?.checkout}
            onChange={handleDurationChange}
          />
        </h4>
      </div>
      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>
      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>
      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isDisabled}
      >
        Pay Now (${totalAmount})
      </button>
    </form>
  );
};
