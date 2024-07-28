import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

const SearchBar = ({ placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearClick = () => {
    setInputValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5">
      <Search strokeWidth={2.5} size={30} className="ml-1  text-orange-500 hidden md:block"/>
      <input value={inputValue} onChange={handleInputChange} className="w-full outline-none shadow-none text-xl focus-visible:ring-0 " placeholder={placeholder}/>
      {inputValue && (
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleClearClick}
        >
          Clear
        </Button>
      )}
      <Button type="submit" className="rounded-full bg-orange-500">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
