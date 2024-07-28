import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";
import { Dot } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UpdateResultCard = ({ restaurant }) => {
  return (
    <div className="grid lg:grid-cols-[2fr_3fr] gap-3">
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt="image"
          className=" rounded-md w-full h-full object-cover"
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
          <div className="flex gap-2 flex-col md:w-28">
            <div className="flex gap-1 items-center rounded-full bg-white hover:bg-orange-500">
              {
                window.location.href == "http://localhost:5173/report"?
                <Link to={`/reportlist/${restaurant.restaurantName}`}>
                   <Button>View Report!</Button>
                </Link>
                
                :
                <Link to={`/update/${restaurant.restaurantName}/${restaurant._id}`}>
                <Button>Update Me!</Button>
             </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResultCard;
