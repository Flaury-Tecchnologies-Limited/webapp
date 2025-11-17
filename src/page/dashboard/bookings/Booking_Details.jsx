import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BBooking from "@/components/bookings/BBooking";
import CBooking from "@/components/bookings/CBooking";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Bookings = () => {
  const navigate = useNavigate();
  const [confirmOrderPopup, setConfirmOrderPopup] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth <= 900
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallViewport(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const salonData = {
    id: 1,
    name: "Timeless Salon",
    description:
      "At Timeless Salon, we believe that beauty is not just akin deep, It's a reflection of your inner vitality. That's why our team of experienced professionals is...",
    coverPhoto: "/timelesssaloncoverimg.png",
    image: "/timelesssalonimg.png",
    services: [
      "Hair Treatment",
      "Hair Extension",
      "Hair Removal",
      "Hair Coloring",
      "Hair Styling",
    ],
    // bookables: [
    //   { id: 1, title: "Hair Conditioning", price: "20" },
    //   { title: "Hair Coloring", price: "50" },
    //   { title: "Hair Styling", price: "30" },
    //   { title: "Hair Extension", price: "40" },
    // ],
    rating: 4.2,
    review: 1286,
    location: "Dora Hill, Camelot",
    distance: "20km away",
    time: "8:00pm",
    reviews: [
      {
        img: "/timelessrecommended.png",
        name: "Pella Tehilah",
        time: "2days ago",
        text: "This is my first time using this service and I'm thriled about their works",
        rating: "4.5",
      },
      {
        img: "/timelessrecommended.png",
        name: "Pella Tehilah",
        time: "2days ago",
        text: "This is my first time using this service and I'm thriled about their works",
        rating: "4.5",
      },
      {
        img: "/timelessrecommended.png",
        name: "Pella Tehilah",
        time: "2days ago",
        text: "This is my first time using this service and I'm thriled about their works",
        rating: "4.5",
      },
      {
        img: "/timelessrecommended.png",
        name: "Pella Tehilah",
        time: "2days ago",
        text: "This is my first time using this service and I'm thriled about their works",
        rating: "4.5",
      },
      {
        img: "/timelessrecommended.png",
        name: "Pella Tehilah",
        time: "2days ago",
        text: "This is my first time using this service and I'm thriled about their works",
        rating: "4.5",
      },
    ],
    teams: [
      { img: "/team-img.png", rating: "5.0" },
      { img: "/team-img.png", rating: "5.0" },
      { img: "/team-img.png", rating: "5.0" },
    ],
  };

  const confirmOrders = () => {
    setConfirmOrderPopup(true);
  };

  const orderData = [
    {
      name: "Hair Treatment",
      start_price: "49.99",
      fromTime: "7:30am",
      toTime: "5:30pm",
    },
    {
      name: "Eyebrow Shaping",
      start_price: "49.99",
      fromTime: "7:30am",
      toTime: "5:30pm",
    },
    {
      name: "Eyebrow Shaping",
      start_price: "49.99",
      fromTime: "7:30am",
      toTime: "5:30pm",
    },
    {
      name: "Eyebrow Shaping",
      start_price: "49.99",
      fromTime: "7:30am",
      toTime: "5:30pm",
    },
  ];

  const bookService = () => {
    navigate("/bookings-flow");
  };
  const { user } = useAuth();
  const role = user?.role;

  return (
    <DashboardLayout>
      <div className="flex gap-8 text-primary">
        <div className="flex flex-col lg:flex-row gap-8 text-primary">
          {(role === "business" || role === "service_provider") ? (
            <BBooking />
          ) : (
            <CBooking salonData={salonData} confirmOrders={confirmOrders} />
          )}
        </div>

        {confirmOrderPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
            <div className="bg-[#fdf7f1] w-full max-w-md rounded-lg shadow-lg relative p-6 md:p-8">
              <button
                onClick={() => setConfirmOrderPopup(false)}
                className="absolute top-4 right-4 text-black text-xl"
              >
                ×
              </button>

              <h3 className="text-xl md:text-2xl font-semibold text-center text-[#663300] mb-6">
                Confirm Orders
              </h3>

              <div className="space-y-4 text-sm text-[#663300]">
                {orderData.map((data, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="font-semibold">{data.name} -</div>
                    <div className="flex flex-col mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px]">Start price:</span>
                        <span className="text-gray-400 line-through text-[13px]">
                          $70.00
                        </span>
                        <span className="font-semibold text-[13px]">
                          ${data.start_price}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[13px]">
                        <span>Time of event:</span>
                        <span>
                          <span className="text-gray-400 pr-1">From:</span>
                          {data.fromTime}
                        </span>
                        <span>
                          <span className="text-gray-400 pr-1">To:</span>
                          {data.toTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={bookService}
                className="w-full mt-6 bg-[#663300] hover:bg-[#4d2600] transition text-white font-semibold py-2.5 rounded-md"
              >
                Continue Booking
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Bookings;
