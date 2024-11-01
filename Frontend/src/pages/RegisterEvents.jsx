import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

export default function EventRegistrationForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userData, setUserData] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch user info and events on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/students/${user.id}`
        );
        if (response.data.success) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        if (response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUserData();
    fetchEvents();
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const onSubmit = (data) => {
    console.log(data);
    alert("Registration successful!");
  };

  const handleEventChange = (event) => {
    const { value, checked } = event.target;

    setSelectedEvents((prevSelected) => {
      const updatedSelected = checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value);

      // Calculate total cost
      const newTotalCost = updatedSelected.reduce((sum, eventName) => {
        const foundEvent = events.find((e) => e.title === eventName);
        return sum + (foundEvent ? foundEvent.cost : 0);
      }, 0);

      setTotalCost(setTotalCost);
      return updatedSelected;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-grey-800 to-indigo-900">
      <div className="w-full max-w-[300px] md:max-w-[500px] mx-auto p-4 md:p-8 shadow-input bg-gradient-to-br from-gray-800 to-grey-600 text-white rounded-2xl p-6 lg:p-8">
        <h2 className="font-bold text-xl text-white text-center">
          Register for the Event
        </h2>
        <form className="my-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Non-editable fields populated from API */}
          <div className="flex flex-col space-y-2 w-full mt-4">
            <Label className="text-white">Full Name</Label>
            <Input {...register("name")} value={userData.name || ""} readOnly />
          </div>
          <div className="flex flex-col space-y-2 w-full mt-4">
            <Label className="text-white">Email Address</Label>
            <Input
              {...register("email")}
              value={userData.email || ""}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mt-4">
            <Label className="text-white">Registration Number</Label>
            <Input
              {...register("regdNo")}
              value={userData.registrationNumber || ""}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mt-4">
            <Label className="text-white">Section</Label>
            <Input
              {...register("section")}
              value={userData.section || ""}
              readOnly
            />
          </div>

          {/* Event Selection Dropdown */}
          <div className="relative mt-4" ref={dropdownRef}>
            <h3 className="text-white">Select Events:</h3>
            <button
              type="button"
              className="bg-gray-700 text-white rounded-md w-full mt-2 p-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedEvents.length > 0
                ? `Selected Events: ${selectedEvents.join(", ")}`
                : "Choose Events"}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 bg-gray-800 border border-gray-600 rounded-md w-full mt-2 p-2 max-h-48 overflow-y-auto">
                {events.map((event) => (
                  <div key={event._id} className="flex items-center mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value={event.title}
                        onChange={handleEventChange}
                        checked={selectedEvents.includes(event.title)}
                        className="mr-2"
                      />
                      <span className="text-white">
                        {event.title} - ₹{event.cost}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total Cost */}
          <div className="mt-4">
            <span className="text-white">Total Cost: ₹{totalCost}</span>
          </div>

          {/* Submit Button */}
          <button
            className="bg-gradient-to-br from-gray-700 to-gray-500 w-full text-white rounded-md h-10 font-medium mt-4"
            type="submit"
          >
            Pay and Register
          </button>
        </form>
      </div>
    </div>
  );
}
