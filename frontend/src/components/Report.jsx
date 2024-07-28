
import React from "react";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";


const Report = () => {
  const { restaurantName } = useParams();


  return <OrderList restaurantName={restaurantName} />;
};

export default Report;
