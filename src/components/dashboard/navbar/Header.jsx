"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Bell, Search, Settings, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {
  const [searchValue, setSearchValue] = useState("")
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const { control, handleSubmit, watch } = useForm();

  const onSubmit = () => {
    setShowPopup(false);
  };
  const { user } = useAuth();
  const roleData = user?.role;

  return (
    <div className="w-full py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <div className="relative mx-4 flex gap-6 items-center">
          {/* Notification Bell */}
          <Link to="/notifications" className="relative text-primary rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </Link>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-[#8B4513]/60" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-4 py-2 h-8 text-primary bg-white border-primary border rounded-md focus:ring-primary focus:ring-1 focus:border-primary"
            />
          </div>

          <img
            src="/filter.svg"
            alt=""
            onClick={() => setShowPopup(true)}
            className="h-6 w-6 cursor-pointer"
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4 sm:space-x-6">

          {/* Settings Icon */}
          <Link to="/settings" className="rounded-full text-primary hover:bg-gray-100">
            <Settings className="h-6 w-6" />
          </Link>

          {/* Favorites - hide for service providers */}
          {roleData !== "service_provider" && roleData !== "business" && (
            <Link to="/favorites" className="rounded-full text-primary hover:bg-gray-100">
              <Heart className="h-6 w-6" />
            </Link>
          )}

          {/* User Profile */}
          {/* <div className="flex items-center space-x-2">
            <span className="hidden md:block text-primary font-medium">{userData.name}</span>
              <img src={userData.profilePicture || "/placeholder.svg"} alt="Profile" className="h-8 w-8 rounded-full border border-[#8B4513]/20" />
          </div> */}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white w-[90%] md:w-[35%] rounded-xl shadow-2xl p-4 md:p-8 relative">

            {/* Close Button */}
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-red-500 transition"
              onClick={() => setShowPopup(false)}
              aria-label="Close Filter Popup"
            >
              <img src="/close.svg" alt="Close" className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-black">Filter</h3>
              <p className="text-sm text-gray-400">Apply filters to refine search</p>
            </div>

            <div className="space-y-4">

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select
                  id="category"
                  className="w-full border border-gray-300 text-sm rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Choose Category</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Input
                  control={control}
                  name="location"
                  placeholder="Enter your location"
                  validateType="min"
                  minValue={2}
                />
              </div>

              {/* Min-Max Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex w-full items-center justify-between gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex- w-[45%] text-center bg-none border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="border-t border-dashed border-gray-300 h-3 w-8"></div>
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex- w-[45%] text-center border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="font-semibold py-2 px-6 border border-primary text-primary text-sm rounded-md hover:bg-secondary hover:text-primary transition"
              >
                Reset
              </button>
              <button
                type="button"
                className="font-semibold py-2 px-6 bg-primary text-white text-sm rounded-md hover:opacity-90 transition"
                onClick={() => handleSubmit(onSubmit)()}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainNav
