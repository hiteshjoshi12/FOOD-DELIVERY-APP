import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CusinesList } from "../Utils/CusineConfig";

const AddRestro = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [delivery_time, setdelivery_time] = useState("");
  const [imageUrl, setImg_url] = useState("");
  const [delivery_cost, setdelivery_from] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [menuItems, setMenuItems] = useState([{ name: "", price: "",description:"",img:"" }]);

  const handlerestroname = (e) => {
    setRestaurantName(e.target.value);
  };
  const handlecity = (e) => {
    setCity(e.target.value);
  };
  const handlecountry = (e) => {
    setCountry(e.target.value);
  };
  const handledelivery = (e) => {
    setdelivery_time(e.target.value);
  };

  const handleimgurl = (e) => {
    setImg_url(e.target.value);
  };
  const handledeliveryfrom = (e) => {
    setdelivery_from(e.target.value);
  };
  const handleCuisine = (e) => {
    const { value } = e.target;
    if (selectedCuisines.includes(value)) {
      setSelectedCuisines(
        selectedCuisines.filter((cuisine) => cuisine !== value)
      );
    } else {
      setSelectedCuisines([...selectedCuisines, value]);
    }
  };

  const handleMenuItemNameChange = (index, e) => {
    const newItems = [...menuItems];
    newItems[index].name = e.target.value;
    setMenuItems(newItems);
  };
  const handleMenuDescriptionChnage = (index, e) => {
    const newItems = [...menuItems];
    newItems[index].description = e.target.value;
    setMenuItems(newItems);
  };
  const handleMenuItemImageUrlChange = (index, e) => {
    const newItems = [...menuItems];
    newItems[index].img = e.target.value;
    setMenuItems(newItems);
  };

  const handleMenuItemPriceChange = (index, e) => {
    const newItems = [...menuItems];
    newItems[index].price = e.target.value;
    setMenuItems(newItems);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", price: "" }]);
  };

  const removeMenuItem = (index) => {
    const newItems = [...menuItems];
    newItems.splice(index, 1);
    setMenuItems(newItems);
  };

  const handlesumit = () => {
    const restrodata = {
      restaurantName,
      city,
      country,
      delivery_time,
      delivery_cost,
      cuisines: selectedCuisines,
      menuItems: menuItems.filter((item) => item.name && item.price),
      imageUrl,
    };

    if (restaurantName == "" || city == "" || country == "") {
      toast.warning("Please fill all fields");
    } else {
      axios
        .post("http://localhost:3001/addrestro", restrodata)
        .then((result) => console.log(result))
        .catch((err) => toast.warning(err));
      toast.success("Restaurent added succesfully! ");
    }
  };
  return (
    <form className="w-[104%] md:w-11/12 md:ml-36 md:my-9 ">
      <div className="flex flex-col justify-between md:justify-center  items-center">
        <div className="flex w-full justify-between md:justify-start  items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="resttro-name">
            Restro Name
          </label>
          <input
          placeholder="Restaurent Name"
            onChange={handlerestroname}
            className=" border-2 border-black md:w-[234%] md:rounded-lg md:p-2"
            type="text"
          />
        </div>
        <div className="flex w-full justify-between items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="city">
            City
          </label>
          <input
          placeholder="City"
            onChange={handlecity}
            className=" border-2 border-black md:w-[234%] md:p-2"
            type="text"
          />
        </div>
        <div className="flex w-full justify-between items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="country">
            County
          </label>
          <input
          placeholder="Country"
            onChange={handlecountry}
            className=" border-2 border-black md:w-[234%] md:p-2"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col w-full  justify-center items-center">
        <div className="flex w-full justify-between items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="country">
            Delivery Cost
          </label>
          <input
          placeholder="Delivery Cost"
            onChange={handledeliveryfrom}
            className=" border-2 border-black md:w-[234%] md:p-2"
            type="text"
          />
        </div>

        <div className="flex w-full justify-between items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="country">
            Delivery Time
          </label>
          <input
          placeholder="Delivery Time"
            onChange={handledelivery}
            className=" border-2 border-black md:w-[234%] md:p-2"
            type="text"
          />
        </div>

        <div className="flex w-full justify-between items-center p-2 ">
          <label className="text-xl font-bold md:w-1/2" htmlFor="country">
            Image URL
          </label>
          <input
          placeholder="Image url"
            onChange={handleimgurl}
            className=" border-2 border-black md:w-[234%] md:p-2"
            type="text"
          />
        </div>

        <div className="flex gap-12 w-full justify-between items-center p-2">
          <label className="text-xl font-bold md:w-96">Cuisines</label>
          <div className="flex flex-wrap">
            {CusinesList.map((cuisine, index) => (
              <div key={index} className="mr-4 mb-2">
                <input
                  type="checkbox"
                  id={cuisine}
                  name={cuisine}
                  value={cuisine}
                  onChange={handleCuisine}
                />
                <label htmlFor={cuisine} className="ml-2">
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          {menuItems.map((menuItem, index) => (
            <div key={index} className="flex w-full justify-between items-center p-2">
              <label className="text-xl mr-2 md:w-72 font-bold ">Menu Items</label>
              <div className="flex flex-col md:mr-8 w-full items-center gap-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={menuItem.name}
                  onChange={(e) => handleMenuItemNameChange(index, e)}
                  className="border-2 border-black md:w-[840px] md:p-2"
                />
                <input
                  type="number"
                  placeholder="Item Price"
                  value={menuItem.price}
                  onChange={(e) => handleMenuItemPriceChange(index, e)}
                  className="border-2 border-black md:w-[840px] md:p-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={menuItem.description}
                  onChange={(e) => handleMenuDescriptionChnage(index, e)}
                  className="border-2 border-black md:w-[840px] md:p-2"
                />
                <input
                  type="text"
                  placeholder="IMG URL"
                  value={menuItem.img}
                  onChange={(e) => handleMenuItemImageUrlChange(index, e)}
                  className="border-2 border-black md:w-[840px] md:p-2"
                />
              </div>
              {index === menuItems.length - 1 && (
                <Button
                  type="button"
                  className="rounded-xl md:p-6 bg-orange-500 hover:bg-whitem-3 p-3 ml-2"
                  onClick={addMenuItem}
                >
                  Add Item
                </Button>
              )}
              {index !== menuItems.length - 1 && (
                <Button  className="rounded-xl md:p-7 bg-orange-500 hover:bg-whitem-3 p-3 ml-2" type="button" onClick={() => removeMenuItem(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        
        </div>
        
      </div>
      <div className="flex my-3">
        <Button
          onClick={handlesumit}
          className="rounded-xl bg-orange-500 hover:bg-whitem-3 p-3 flex-1"
          type="button"
        >
          Add New Restro
        </Button>
      </div>
    </form>
  );
};

export default AddRestro;
