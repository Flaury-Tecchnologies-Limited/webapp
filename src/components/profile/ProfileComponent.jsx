import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileDetailsItem from "./ProfileDetailsItem";
import HelpComponent from "./HelpComponent";
import helpchat from "/helpchat.svg";
import forgotPassword from "/forgotpassword.svg";
import FaqsComponent from "./FaqsComponent";
import SettingsComponent from "./SettingsComponent";
import PaymentComponent from "./PaymentComponent";

const ProfileComponent = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    profileimg: "",
    name: "",
    email: "",
  });
  const [showLogout, setShowLogout] = useState(false);
  const [page, setPage] = useState("");
  const [profileDetails, setProfileDetails] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fetchProfileData = () => {
      const profileData = {
        profileimg: "/profileimg.png",
        name: "Becca Adom",
        email: "beccadom@gmail.com",
      };
      setProfileData(profileData);
    };

    fetchProfileData();

    const simulatedProfileDetails = [
      {
        id: 1,
        name: "Settings",
        details: "Edit profile, change phone number...",
        icon: "/profilesettings.svg",
      },
      {
        id: 3,
        name: "Payment",
        details: "Add Payment Option",
        icon: "/payment.svg",
      },
      {
        id: 4,
        name: "Promotions",
        details: "Get promo code and enjoy discount on your bookings",
        icon: "/promotion.svg",
      },
      {
        id: 2,
        name: "About",
        details: "FAQs, Privacy policy, Terms and conditions",
        icon: "/about.svg",
      },
      {
        id: 5,
        name: "Blogs",
        details:
          "Enjoy daily blogs and articles about the latest trends in flaury ecosystem",
        icon: "/blog.svg",
      },
      {
        id: 6,
        name: "Logout",
        details: "Logout of this account and use another account",
        icon: "/logout.svg",
      },
    ];

    setProfileDetails(simulatedProfileDetails);
  }, []);

  const handleProfileClick = () => {
    setPage("profile");
  };

  const handleAboutClick = () => {
    setPage("faqs");
  };

  const handleHelpClick = () => {
    setPage("help");
  };

  const handleSettingsClick = () => {
    setPage("settings");
  };

  const handlePaymentClick = () => {
    setPage("payment");
  };

  const handleLogout = () => {
    setShowLogout(true);
  };

  const handleComingSoon = () => {
    setShowComingSoon(true);
  };
  const { logOut, role } = useAuth();

  const onLogout = () => {
    // use centralized logout
    logOut();
  };

  return (
    <div className="mb-10">
      <Link
        onClick={() => setPage("")}
        className="flex gap-2 text-primary font-bold text-left"
      >
        <img src="/backarrow.svg" alt="" />
        Back
      </Link>
      <div className="relative w-full flex flex-col items-center text-center text-black py-4">
        {page === "faqs" ? (
          <>
            <h3 className="font-bold">FAQs</h3>
            <p className="font-bold">Top questions can we help you today?</p>
            <div className="flex gap-3 mt-10">
              {/* {["Payment", "Coupons", "Bookings"].map((label) => (
                <button
                  key={label}
                  className={`border text-xs px-4 py-1 rounded-full ${label === "All"
                    ? "bg-primary text-white border-primary"
                    : "text-primary border-primary"
                    }`}
                >
                  {label}
                </button>
              ))} */}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 items-center space-x-2">
              <img
                src={profileData.profileimg || "/placeholder.svg"}
                alt=""
                className="h-14 w-14 rounded-full border border-[#8B4513]/20"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold">{profileData.name}</h3>
                <p className="text-xs">{profileData.email}</p>
              </div>
            </div>
            {page === "help" ? (
              <p className="font-bold">How can we help you?</p>
            ) : (
              <button
                className="mt-4 md:mt-0 md:absolute flex items-center gap-2 bottom-10 right-4 bg-primary text-white border text-xs px-10 py-2 rounded-lg font-semibold"
                onClick={handleHelpClick}
              >
                <img src={helpchat} alt="Help chat" />
                Help
              </button>
            )}
          </>
        )}
      </div>
      <hr className="border-primary mb-5" />
      {page === "profile" ? (
        <SettingsComponent />
      ) : page === "help" ? (
        <HelpComponent />
      ) : page === "faqs" ? (
        <FaqsComponent />
      ) : page === "payment" ? (
        <PaymentComponent />
      ) : (
        profileDetails.map((profileDetail) => (
          <ProfileDetailsItem
            key={profileDetail.id}
            name={profileDetail.name}
            details={profileDetail.details}
            icon={profileDetail.icon}
            setShowLogout={setShowLogout}
            onClick={
              profileDetail.name === "Settings"
                ? handleProfileClick
                : profileDetail.name === "About"
                ? handleAboutClick
                : profileDetail.name === "Help"
                ? handleHelpClick
                : profileDetail.name === "Settings"
                ? handleSettingsClick
                : profileDetail.name === "Payment"
                ? handlePaymentClick
                : profileDetail.name === "Blogs" ||
                  profileDetail.name === "Promotions"
                ? handleComingSoon
                : handleLogout
            }
          />
        ))
      )}
      {showLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#db8335] bg-opacity-50 z-50">
          <div className="flex flex-col bg-secondary w-full md:w-[40%] mx-4 py-8 px-4 md:px-20 gap-3 rounded-lg shadow-lg text-center">
            <img
              src={forgotPassword}
              alt="Forgot password"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-black">
              Are you sure you want to log-out?
            </h3>
            <button
              className="transition bg-primary text-white border text-xs px-8 py-2 rounded-lg font-semibold w-full"
              onClick={onLogout}
            >
              Yes, log me out
            </button>
            <button
              className="transition bg-primary text-white border text-xs px-8 py-2 rounded-lg font-semibold opacity-50 w-full"
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showComingSoon && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#db8335] bg-opacity-50 z-50">
          <div className="flex flex-col bg-secondary w-full md:w-[30%] mx-4 py-8 px-4 md:px-10 gap-3 rounded-lg shadow-lg text-center">
            <h3 className="font-bold text-black mb-4">Coming Soon</h3>
            <p className="mb-6">This feature will be available soon.</p>
            <button
              className="transition bg-primary text-white border text-xs px-8 py-2 rounded-lg font-semibold w-full"
              onClick={() => setShowComingSoon(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
