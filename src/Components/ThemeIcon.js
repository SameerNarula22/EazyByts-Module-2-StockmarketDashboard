import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { MoonIcon } from "@heroicons/react/24/solid";

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-full border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg transition duration-300 hover:scale-125 w-12 h-12 ${
        darkMode ? "shadow-gray-800 bg-yellow-400" : "bg-neutral-400 "
      }`}
    >
      <MoonIcon
        className={`h-8 w-8 cursor-pointer stroke-1 ${
          darkMode
            ? "fill-black stroke-black"
            : "fill-white stroke-neutral-400"
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
