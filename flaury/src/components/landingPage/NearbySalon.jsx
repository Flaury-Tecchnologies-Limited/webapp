import dot from "/dot.svg";
import star from "/star.svg";
import { Link } from "react-router-dom";
import Button from "../Button";
// Simulated backend data
const nearbySalons = [
  {
    id: 1,
    image: "/solfcare-salon.png",
    name: "Solfcare Salon",
    rating: 4.5,
    location: "Alagbaka, Akure",
    distance: "8km away",
    reviews: "1,286",
  },
  {
    id: 2,
    image: "/dubai-salon.png",
    name: "Dubai Executive Salon",
    rating: 4.5,
    location: "Ikorudu, Lagos",
    distance: "20km away",
    reviews: "1,286",
  },
  {
    id: 3,
    image: "/moonlight-salon.png",
    name: "Moonlight Spa",
    rating: 4.5,
    location: "Ikeja, Lagos",
    distance: "28km away",
    reviews: "1,286",
  },
  {
    id: 4,
    image: "/glams-salon.png",
    name: "Glams & More",
    rating: 4.5,
    location: "Bodija, Ibadan",
    distance: "20km away",
    reviews: "1,286",
  },
];

const NearbySalon = () => {
  return (
    <div className="my-6 px-4 max-w-[1200px] mx-auto ">
      <h3 className="font-bold text-lg py-2">Nearby Salon</h3>
      <div className="w-full overflow-x-scroll md:overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {nearbySalons.map((salon) => (
            <Link
              key={salon.id}
              to={`/salon/${salon.id}`}
              className="salon-link"
            >
              <div>
                <img src={salon.image} alt="" className="w-full" />
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <h4 className="font-semibold flex">
                      {salon.name} <img src="/salon-verified.svg" alt="" />
                    </h4>
                  </div>
                  <p className="flex gap-1 text-xs">
                    {salon.rating}
                    <img src="/star.svg" alt="" />({salon.reviews})
                  </p>
                </div>
                <p className="flex text-xs text-[#000]">
                  {salon.location} <img src={dot} alt="" className="mx-2" />
                  {salon.distance}
                </p>
                <Button title="Book now" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbySalon;
