import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { useState, useEffect } from "react";
import menu from "/hamburger-menu.svg";
import Button from "./Button";

const Nav = () => {
  const location = useLocation();
  const [authNav, setAuthNav] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setAuthNav(
      location.pathname === "/login" ||
        location.pathname === "/choose-role" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/forgot2" ||
        location.pathname === "/forgot3"
    );
  }, [location]);

  const toggleCompanyMenu = () => {
    setShowCompanyMenu(!showCompanyMenu);
  };

  const handleLinkClick = () => {
    setShowCompanyMenu(false); // Close the dropdown menu after clicking a link
    setShowNav(false); // Close the mobile menu after clicking a link
  };

  return (
    <>
      {authNav ? (
        <div className="fixed top-0 w-full bg-[#fff] flex justify-center items-center z-[100] border border-b">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 md:h-14" />
          </Link>
        </div>
      ) : (
        <>
          <div className="fixed top-0 w-full bg-[#fff] px-4 md:px-20 py-2 z-[100] border border-b">
            <div className="max-w-[1200px] mx-auto flex justify-between items-center">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10 md:h-14" />
              </Link>
              <nav className="hidden md:block">
                <ul className="flex gap-4 items-center">
                  <li>
                    <Link className="text-sm font-semibold" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-sm font-medium"
                      onClick={handleLinkClick} // Close dropdown after link click
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="block px-4 py-2 text-sm font-medium"
                      onClick={handleLinkClick} // Close dropdown after link click
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Button
                      title="Sign Up"
                      onClick={() => navigate("/choose-role")}
                      customClasses="px-8 py-3"
                    />
                  </li>
                  <li>
                    <Link to="/login">
                      <button className="transition border border-lightPrimaryColor text-primaryColor text-xs px-8 py-3 rounded-lg font-semibold">
                        Login
                      </button>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                className="block md:hidden cursor-pointer"
                onClick={() => setShowNav(!showNav)}
              >
                <img src={menu} alt="" />
              </div>
            </div>
          </div>
          {showNav && (
            <nav className="mt-14 md:mt-0 block md:hidden">
              <hr />
              <ul className="px-4 py-4">
                <li className="text-normal pb-4">
                  <Link to="/" onClick={() => setShowNav(false)}>
                    Home
                  </Link>
                </li>
                <li className="text-normal pb-4">
                  <Link to="/about" onClick={() => setShowNav(false)}>
                    About Us
                  </Link>
                </li>
                <li className="text-normal pb-4">
                  <Link to="/blog" onClick={() => setShowNav(false)}>
                    Blog
                  </Link>
                </li>
                <li className="text-normal pb-4">
                  <Link to="#services" onClick={() => setShowNav(false)}>
                    Services
                  </Link>
                </li>
                <li>
                  <Button
                    title="Sign Up"
                    onClick={() => navigate("/choose-role")}
                    customClasses="px-4 py-3 mb-2"
                  />
                </li>
                <li>
                  <Link to="/login" onClick={() => setShowNav(false)}>
                    <button className="transition border border-lightPrimaryColor text-primaryColor text-sm px-4 py-2 rounded-lg">
                      Login
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default Nav;
