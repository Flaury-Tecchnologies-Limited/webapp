import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import forwardarrow from "/forwardarrow.svg";
import BusinessInfoForm from "./BusinessInfoForm";

const SettingsComponent = () => {
  const [page, setPage] = useState("");
  const { role } = useAuth();
  return (
    <div>
      {page === "edit-profile" ? (
        <div>
          {role === "service_provider" ? (
            <>
              <div
                className="bg-white w-full rounded-md shadow-xl mb-4 flex justify-between cursor-pointer p-4"
                onClick={() => setPage("business-details")}
              >
                <div className="flex items-center gap-4">
                  <img src="/business.svg" alt="" className="rounded-md" />
                  <div>
                    <p className="text-black font-semibold text-sm">Business details</p>
                    <p className="text-black mt-2 text-xs">Manage your business settings such as business name & location</p>
                  </div>
                </div>
                <img src={forwardarrow} alt="" />
              </div>
              <div
                className="bg-white w-full rounded-md shadow-xl mb-4 flex justify-between cursor-pointer p-4"
                onClick={() => setPage("team")}
              >
                <div className="flex items-center gap-4">
                  <img src="/team.svg" alt="" className="rounded-md" />
                  <div>
                    <p className="text-black font-semibold text-sm">Team</p>
                    <p className="text-black mt-2 text-xs">Manage your team members</p>
                  </div>
                </div>
                <img src={forwardarrow} alt="" />
              </div>
            </>
          ) : (
            <form className="w-full md:w-[400px] mx-auto text-black">
              <div className="mt-8">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
                />
              </div>
              <div className="mt-8">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
                />
              </div>
              <div className="mt-8">
                <label htmlFor="gender">Gender</label>
                <select className="border border-1 border-primary w-full block px-4 py-1 rounded-md">
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="transition bg-primary text-white border text-xs w-full mt-10 py-3 rounded-lg font-semibold"
                onClick={() => setPage("")}
              >
                Save
              </button>
            </form>
          )}
        </div>
      ) : page === "business-details" ? (
        <>
            <h3 className="font-semibold text-black">Business details</h3>
            <BusinessInfoForm />
        </>
      ) : page === "team" ? (
        <>
          <h3 className="font-semibold text-black">Team</h3>
          <div className="flex flex-col mx-auto justify-center items-center gap-4 mt-12">
            <img src="/team.png" alt="" className="rounded-md" />
            <span className="text-black/80 font-semibold text-md">This feature is coming soon!</span>
          </div>
        </>
      ) : page === "change-password" ? (
        <div>
          <form className="w-full md:w-[400px] mx-auto text-black">
            <div className="mt-8">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="transition bg-primary text-white border text-xs w-full mt-10 py-3 rounded-lg font-semibold"
              onClick={() => setPage("")}
            >
              Save
            </button>
          </form>
        </div>
      ) : page === "change-phone-number" ? (
        <div>
          <form className="w-full md:w-[400px] mx-auto text-black">
            <div className="mt-8">
              <label htmlFor="oldPhoneNumber">Old Phone Number</label>
              <input
                type="number"
                name="oldPhoneNumber"
                className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="newPhoneNumber">New Phone Number</label>
              <input
                type="number"
                name="newPhoneNumber"
                className="border border-1 border-primary w-full block px-4 py-1 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="transition bg-primary text-white border text-xs w-full mt-10 py-3 rounded-lg font-semibold"
              onClick={() => setPage("")}
            >
              Save
            </button>
          </form>
          <button onClick={() => setPage("")}>Back</button>
        </div>
      ) : (
        <>
          <div
            className="bg-white w-full rounded-md shadow-xl mb-4 flex justify-between cursor-pointer p-6"
            onClick={() => setPage("edit-profile")}
          >
            <div className="flex items-center gap-4">
              <img src="/profileIcon.svg" alt="" className="rounded-md" />
              <div>
                <p className="text-black font-semibold text-sm">Edit Profile</p>
              </div>
            </div>
            <img src={forwardarrow} alt="" />
          </div>
          <div
            className="bg-white w-full rounded-md shadow-xl mb-4 flex justify-between cursor-pointer p-6"
            onClick={() => setPage("change-password")}
          >
            <div className="flex items-center gap-4">
              <img
                src="/changePasswordIcon.svg"
                alt=""
                className="rounded-md"
              />
              <div>
                <p className="text-black font-semibold text-sm">
                  Change Password
                </p>
              </div>
            </div>
            <img src={forwardarrow} alt="" />
          </div>
          <div
            className="bg-white w-full rounded-md shadow-xl mb-4 flex justify-between cursor-pointer p-6"
            onClick={() => setPage("change-phone-number")}
          >
            <div className="flex items-center gap-4">
              <img src="/phoneNumberIcon.svg" alt="" className="rounded-md" />
              <div>
                <p className="text-black font-semibold text-sm">
                  Change Phone Number
                </p>
              </div>
            </div>
            <img src={forwardarrow} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsComponent;
