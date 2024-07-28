import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import { toast } from "sonner";

const SearchPage = () => {
  const { city } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/restro?city=${city}`
        );
        setRestaurants(response.data);

      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, [city]);

  const total = restaurants.length;

  const handleSubmit = async (inputValue) => {
    if (inputValue === "") {
      toast.info("Displaying  all the results");
    }
    try {
      const response = await axios.get(
        `http://localhost:3001/api/restro?city=${city}&search=${inputValue}`
      );
      setRestaurants(response.data);

    } catch (error) {
      toast.error("Error fetching restaurants", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div></div>
    
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar placeholder="Search by cuisines or restaurant name" onSubmit={handleSubmit}/>
        <SearchResultInfo city={city} total={total} />
        {restaurants.map((restaurant, index) => (
          <SearchResultCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
