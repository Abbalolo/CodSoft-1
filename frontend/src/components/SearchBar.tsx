import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const SearchBar: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const { handleSearch, filteredList } = useContext(SearchContext);
  const navigate = useNavigate();

   const handleClick = () => {
    if (prompt.trim() !== "") {
      handleSearch(prompt);
      console.log(filteredList)
   
    } else {
      navigate("/");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };


  useEffect(() => {
   handleClick()
  }, [prompt])

  return (
    <div className="flex w-[50%] md:w-[60%] justify-center items-center border border-gray-300 pl-2 gap-2 rounded-md shadow-sm overflow-hidden">
      <button type="button" onClick={handleClick}>
        <FiSearch className="text-gray-500 cursor-pointer" />
      </button>
      <input
        className="p-1 md:p-2 w-full text-sm md:text-base border-none outline-none"
        type="search"
        placeholder="Search a post"
        value={prompt}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
