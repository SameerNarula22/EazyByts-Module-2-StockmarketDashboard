import React, { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { searchSymbol } from "../api/stock-api";
import SearchResults from "./SearchResults";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";


const Search = () => {
  const { darkMode } = useContext(ThemeContext);

  const [input, setInput] = useState("");

  const [bestMatches, setBestMatches] = useState([]);

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  return (
    
    <div
    className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${
      darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
    }`}
  >
    <input
      type="text"
      value={input}
      className={`w-full px-2 py-2 focus:outline-none rounded-md ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
      placeholder="Search stock..."
      onChange={(event) => setInput(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          updateBestMatches();
        }
      }}
    />
    {input && (
      <button onClick={clear} className="m-1 h-9 w-9 bg-gray-500 hover:bg-gray-600 rounded-full">
        <XMarkIcon className="h-4 w-4 fill-white-500" />
      </button>
    )}
    <button
      onClick={updateBestMatches}
      className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
    >
      <MagnifyingGlassIcon className="h-4 w-4 hover:stroke-white-500" />
    </button>
    {input && bestMatches.length > 0 ? (
      <SearchResults results={bestMatches} />
    ) : null}
  </div>
    
  );
};

export default Search;
