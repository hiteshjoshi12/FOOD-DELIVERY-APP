import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import UpdateResultCard from "./UpdateResultCard";

const UpdateRestro = () => {
  const [inputValue, setInputValue] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const handleSubmit = async (inputValue) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/restro?city=${inputValue}`
      );
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      handleSubmit(inputValue);
    }
  }, [inputValue]);

  const total = restaurants.length;
  return window.location.href != "http://localhost:5173/report" ? (
    <div>
      <SearchBar
        placeholder={"search by city"}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      <div id="main-content" className="flex flex-col gap-5">
        <p className=" font-bold text-2xl mt-4">
          Total {total} Restaurants found!
        </p>
        {restaurants.map((restaurant, index) => (
          <UpdateResultCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <SearchBar
        placeholder={"search by city"}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      <div id="main-content" className="flex flex-col gap-5">
        <p className=" font-bold text-2xl mt-4">
          Total {total} Restaurants found!
        </p>
        {restaurants.map((restaurant, index) => (
          <UpdateResultCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default UpdateRestro;
