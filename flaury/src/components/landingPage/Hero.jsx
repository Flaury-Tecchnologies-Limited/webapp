import React, { useState } from "react";
import vector from "/Vector.svg";
import heroImg1 from "/hero-img1.png";
import search from "/search.svg";

const Hero = () => {
  const popularSearches = [
    "Skin Retouch",
    "Hair Treatment",
    "Spa",
    "Manicure",
    "Pedicure",
    "Nail Art",
    "Facial",
    "Massage",
    "Makeup",
    "Laser Treatment",
  ];
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePopularSearchClick = (searchTerm) => {
    setSearchInput(searchTerm); // Set the search term in input field
  };

  return (
    <div className="h-full w-full hero-bg px-4 py-4 md:px-28 lg:px-32 md:pt-32">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <div className="w-full md:w-1/2 mt-20 md:mt-0">
          <h3 className="text-sm md:text-lg text-white p-2">
            "GREAT LOOK IS NOT BY <br />
            <span className="text-4xl md:text-6xl font-bold">
              ACCIDENT
            </span>{" "}
            <br /> IT'S BY <br />
            <span className="text-4xl md:text-6xl font-bold">APPOINTMENT"</span>
          </h3>
          <p className="hidden md:block text-sm md:text-lg font-semibold text-right text-white">
            _FLAURY
          </p>

          <form className="relative mt-4">
            <div className="flex items-center border rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                name="search"
                id="search"
                value={searchInput} // Bind the search input value to the state
                onChange={handleSearchChange} // Update state on input change
                placeholder="Search for a service"
                className="border-r border-r-lightPrimaryColor w-full px-4 py-2 text-sm text-lightPrimaryColor placeholder-lightPrimaryColor"
              />
              <div className="px-3">
                <img src={search} alt="" />
              </div>
            </div>
          </form>

          <div className="flex gap-4 items-center mt-6">
            <h3 className="text-white text-sm">Popular:</h3>
            <ul className="w-[20rem] md:w-fit overflow-x-auto md:overflow-x-hidden flex gap-4 md:gap-2">
              {/* Dynamically display popular searches based on screen size */}
              {popularSearches
                .slice(0, window.innerWidth <= 768 ? 10 : 5)
                .map((searchTerm, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(searchTerm)} // Set input on click
                    className="border text-xs px-2 md:px-4 py-1 rounded-lg text-white"
                  >
                    {searchTerm}
                  </button>
                ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:inline w-[20rem] h-[20rem]">
          <div className="relative h-full">
            <img
              src={vector}
              alt=""
              className="w-[10rem] h-[10rem] absolute top-0 left-0"
            />
            <img
              src={vector}
              alt=""
              className="w-[10rem] h-[10rem] absolute top-0 right-0"
            />
            <img
              src={vector}
              alt=""
              className="w-[10rem] h-[10rem] absolute bottom-0 left-0"
            />
            <img
              src={vector}
              alt=""
              className="w-[10rem] h-[10rem] absolute bottom-0 right-0"
            />
            <div className="absolute rounded-full w-[20rem] h-[20rem] bg-white">
              <img
                src={heroImg1}
                alt=""
                className="absolute -top-10 -left-[0.35rem] rotate-[0.5deg] transform z-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
