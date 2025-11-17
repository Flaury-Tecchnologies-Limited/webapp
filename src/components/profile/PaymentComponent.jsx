import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileDetailsItem from "./ProfileDetailsItem";

const PaymentComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState("");
  const [profileDetails, setProfileDetails] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { role } = useAuth();

  const deletePopup = () => {
    setShowDeletePopup(true);
  };

  useEffect(() => {
    const simulatedProfileDetails = [
      {
        id: 1,
        name: "Wallet",
        icon: "/Wallet.svg",
      },
      {
        id: 2,
        name: "Transaction",
        icon: "/Transaction.svg",
      },
      {
        id: 3,
        name: "Pay-out",
        icon: "/Pay-out.svg",
      },
    ];

    setProfileDetails(simulatedProfileDetails);
  }, []);

  const handleProfileClick = () => {
    setPage("profile");
  };

  return (
    <>
  {role === "service_provider" ? (
        <>
          {profileDetails.map((profileDetail) => (
            <ProfileDetailsItem
              key={profileDetail.id}
              name={profileDetail.name}
              // details={profileDetail.details}
              icon={profileDetail.icon}
              onClick={
                profileDetail.name === "Profile"
                  ? handleProfileClick
                  : profileDetail.name === "About"
              }
            />
          ))}
        </>
      ) : (
        <>
          <div className="w-full flex justify-center mt-8">
            <button
              className="transition-transform duration-200 shadow-lg bg-primary text-white text-base font-bold px-8 py-3 rounded-xl border-2 border-primary flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary/30 group hover:scale-105"
              onClick={() => setShowPopup(true)}
            >
              <img
                src="/payment.svg"
                alt="Add"
                className="h-5 w-5"
                style={{ filter: "invert(1)" }}
              />
              <span className="text-white transition">Add Payment Card</span>
            </button>
          </div>
          <div className="bg-white w-full rounded-md shadow-xl my-4 flex justify-between items-center p-4">
            <div className="flex gap-8">
              <img src="/settings.svg" alt="" />
              <h2>**** **** **** 2765</h2>
            </div>
            <img
              src="/delete.svg"
              alt=""
              className="cursor-pointer"
              onClick={deletePopup}
            />
          </div>
        </>
      )}

      {showDeletePopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setShowDeletePopup(false)}
        >
          <div
            className="bg-white w-11/12 max-w-md py-8 px-6 md:px-10 rounded-2xl shadow-2xl text-center relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
              onClick={() => setShowDeletePopup(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="font-extrabold mb-3 text-black text-lg">
              Delete Payment Method?
            </h3>
            <p className="font-medium text-sm text-black mb-6">
              It will no longer be available for payments.
              <br />
              Are you sure you want to delete?
            </p>
            <button
              className="font-bold border border-[#ff0000] text-[#ff0000] px-4 py-2 rounded-lg w-full mb-3 hover:bg-[#ff0000] hover:text-white transition"
              onClick={() => setShowDeletePopup(false)}
            >
              Delete
            </button>
            <button
              className="font-bold bg-primary px-4 py-2 rounded-lg w-full text-white hover:bg-[#a05a1c] transition"
              onClick={() => setShowDeletePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white w-11/12 max-w-md py-8 px-6 md:px-10 rounded-2xl shadow-2xl text-center relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="font-extrabold mb-3 text-black text-lg">
              Add Payment Option
            </h3>
            <form>
              <label className="block text-left font-semibold mb-1">
                Card Number
              </label>
              <input
                type="number"
                name="card-number"
                placeholder="Please enter your card number"
                className="border border-primary w-full block px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="col-span-1">
                  <label className="block text-left font-semibold mb-1">
                    Expiry date
                  </label>
                  <input
                    type="number"
                    name="expiry-date"
                    className="border border-primary w-full block px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-left font-semibold mb-1">
                    CVV
                  </label>
                  <input
                    type="number"
                    name="cvv"
                    placeholder="Enter your cvv"
                    className="border border-primary w-full block px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="text-left mt-4">
                <label className="block font-semibold mb-1">PIN</label>
                <input
                  type="number"
                  name="pin"
                  placeholder="Enter your PIN"
                  className="border border-primary block px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                className="font-bold bg-primary px-4 py-2 rounded-lg w-full mt-6 text-white hover:bg-[#a05a1c] transition text-base shadow-md"
                onClick={() => setShowPopup(false)}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentComponent;
