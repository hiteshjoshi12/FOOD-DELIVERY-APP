// DetailsPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Utils/CartSlice";
import { toast } from "sonner";

const DetailsPage = () => {
  const { restaurantName, id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/menu?restaurantName=${restaurantName}&id=${id}`
        );
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items", error);
   
      }
    };

    fetchMenuItems();
  }, [restaurantName, id]);

  const handleAddToCartClick = (menuItem) => {
    dispatch(addToCart({ menuItem, restaurantName })); // Pass both menuItem and restaurantName
    toast.success("Item Added Successfully");
  };

  return (
    <>
      <div className=" shadow-xl shadow-gray-700 rounded-xl ">
        {menuItems.map((menuItem,index) => (
          <div key={index} className="rounded-l border-b-2">
            <div className=" relative flex flex-col p-4 md:p-6  justify-between w-full">
              <p className="uppercase font-bold -tracking-tighter text-xl">
                {menuItem.name}
              </p>
              <p>{menuItem.description}</p>
              <p>₹{menuItem.price}</p>
              <img src={menuItem.img} alt="image" className=" md:absolute md:top-3 md:right-8  md:w-36 md:h-20 w-72 h-60 rounded-xl object-cover"/>
              <button className=" md:absolute md:top-16 md:right-10 border-2 bg-white text-green-500 rounded-xl font-semibold md:w-28 md:p-1 p-3 m-2 " onClick={() => handleAddToCartClick(menuItem)}>ADD To Cart</button>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailsPage;
