// dependencies
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import Reviews from "./Reviews";

const HotelCard = ({ info, fromList, checkin, checkout }) => {
  // create params
  let params = "";
  if (checkin && checkout) {
    params = `?checkin=${checkin}&checkout=${checkout}`;
  }

  return (
    <div
      className={`flex gap-6 border-gray/20 p-4 rounded-md ${
        fromList ? "border" : ""
      }`}
    >
      {fromList && (
        <Image
          src={info?.thumbNailUrl}
          className="max-h-[162px] max-w-[240px]"
          alt={info?.name}
          width={240}
          height={162}
        />
      )}

      <div className="flex-1">
        <h2 className="font-bold text-lg">{info?.name}</h2>
        <p>📍 {info?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <Rating hotelId={info?.id} />
          <Reviews hotelId={info?.id} />
        </div>
        <div className="flex gap-x-2 items-center">
          <p className="bg-yellow-300 inline-block rounded-md px-3 py-1">
            {info?.propertyCategory} Star Property
          </p>
          {info?.isBooked && <p className="text-red-500">Sold out</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${Math.round((info?.highRate + info?.lowRate) / 2)}/night
        </h2>
        <p className=" text-right">Per Night for 1 Rooms</p>
        {fromList ? (
          <Link href={`/hotels/${info?.id}${params}`} className="btn-primary ">
            Details
          </Link>
        ) : (
          <Link
            href={`${
              info?.isBooked ? "" : `/hotels/${info?.id}/payment${params}`
            }`}
            className={`btn-primary ${info?.isBooked? "disabled-btn" : ""}`}
          >
            Book Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
