import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Use AuthContext to get user and logout
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Use the logout function from context
    alert("Logout successful!");
    navigate("/"); // Redirect to home after logout
  };

  // Determine the navbar items based on user role
  const renderNavItems = () => {
    if (user) {
      // User is logged in
      const isAdmin = user.role === "Admin"; // Check if the user is an admin

      return (
        <>
          {["Home", "Events", "Schedule", "Contact Us"].map((item) => (
            <li key={item}>
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded ${
                    isActive
                      ? "underline underline-offset-8 text-blue-700"
                      : "text-white"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/addEvent"
                  className={({ isActive }) =>
                    `block py-2 px-3 md:p-0 rounded ${
                      isActive
                        ? "underline underline-offset-8 text-blue-700"
                        : "text-white"
                    }`
                  }
                >
                  Create Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/coordinators"
                  className={({ isActive }) =>
                    `block py-2 px-3 md:p-0 rounded ${
                      isActive
                        ? "underline underline-offset-8 text-blue-700"
                        : "text-white"
                    }`
                  }
                >
                  Coordinators List
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/registerEvents"
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded ${
                    isActive
                      ? "underline underline-offset-8 text-blue-700"
                      : "text-white"
                  }`
                }
              >
                Register for Events
              </NavLink>
            </li>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-3 md:p-0 rounded text-white hover:text-blue-700"
            >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      // User is not logged in
      return (
        <>
          {["Home", "Events", "Schedule", "Contact Us"].map((item) => (
            <li key={item}>
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded ${
                    isActive
                      ? "underline underline-offset-8 text-blue-700"
                      : "text-white"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `block py-2 px-3 md:p-0 rounded ${
                  isActive
                    ? "underline underline-offset-8 text-blue-700"
                    : "text-white"
                }`
              }
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block py-2 px-3 md:p-0 rounded ${
                  isActive
                    ? "underline underline-offset-8 text-blue-700"
                    : "text-white"
                }`
              }
            >
              Login
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black shadow-lg transition duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <img src="/rgmcetlogo.jpg" className="h-12" alt="RGMCET Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            RGMCET
          </span>
        </div>
        <button
          onClick={toggleMenu}
          type="button"
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden transition duration-200 
                      ${isMenuOpen ? "bg-gray-700" : "bg-transparent"} 
                      hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300`}
          aria-controls="navbar-solid-bg"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-large font-black mt-4 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent text-white">
            {renderNavItems()} {/* Render the appropriate nav items */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
