import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";
import { Link } from "react-router-dom";
import { Banknote, Clock, Dot } from "lucide-react";

const SearchResultCard = ({ restaurant }) => {
  return (
    <Link to={`/details/${restaurant.restaurantName}/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-3">
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt="image"
          className=" rounded-2xl w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
          
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <span className="flex" key={index}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex gap-1 items-center text-green-600">
              <Clock className="text-green-600" />
              {restaurant.delivery_time} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery From ₹{restaurant.delivery_cost}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
