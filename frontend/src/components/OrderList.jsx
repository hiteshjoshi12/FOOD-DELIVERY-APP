import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = ({ restaurantName }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/report?restaurantName=${restaurantName}&startDate=${startDate}&endDate=${endDate}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [restaurantName, startDate, endDate]);

  return (
    <div>
      <div className="flex mt-4 gap-10">
      <h2 className="text-3xl font-bold text-orange-500 tracking-widest">Orders for Restaurant</h2>
        <div className="border-2 border-orange-500 p-2 rounded-xl">
          <label className="mr-1 font-semibold">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="border-2 border-orange-500 p-2 rounded-xl">
          <label className="mr-1 font-semibold">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      {orders.map((order, index) => (
        <div className="" key={order._id}>
          <br />
          <h3 className=" text-2xl font-bold">Order No. {index + 1}</h3>
          <p className="text-lg font-bold">
            Restaurant Name: {order.restaurantName}
          </p>
          <p className="text-lg font-bold">
            Customer Email: {order.customerEmail}
          </p>
          <p className="text-lg font-bold">
            Billing Address: {order.billingAddress}
          </p>

          <ul className="text-lg font-bold">
            {order.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <br />
                <p>Dish Name: {item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
            <br />
            <p>Total Amount: ₹{order.totalAmount}</p>
            <hr className="border-2 border-red-900" />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
