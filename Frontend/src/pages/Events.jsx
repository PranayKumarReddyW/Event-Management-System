import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// EventCard Component to display each event
const EventCard = ({ title, fee, date, venue, contact, description }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col justify-between h-full transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                 w-full sm:w-[250px] md:w-[450px] lg:w-[500px] xl:w-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h2 className="text-3xl font-bold mb-3 text-gray-800 hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-xl font-semibold text-red-500 mb-3">{fee}</p>

      {/* Description as a bullet point list */}
      <div className="text-sm text-gray-700 mt-2">
        {Array.isArray(description) && description.length > 0 ? (
          <ul className="list-disc list-inside">
            {description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p>No description available</p>
        )}
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-blue-700 mb-2">{venue}</p>
        <p className="text-lg font-medium text-green-700 mb-2">{date}</p>
        <p className="text-lg font-medium text-purple-700">{contact}</p>
      </div>
    </motion.div>
  );
};

// BentoGrid Component to fetch and display a flex layout of events
const BentoGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        setEvents(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-r from-gray-500 via-black to-gray-900 min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Title Section */}
        <h1 className="text-center text-5xl font-bold text-white mb-8">
          Events
        </h1>

        {/* Event List */}
        <div className="flex flex-wrap justify-center">
          {events.length === 0 ? (
            <p className="text-center text-lg text-white">
              No events available at the moment.
            </p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                title={event.title}
                fee={`₹${event.cost}`}
                date={`Date: ${new Date(event.date).toLocaleDateString()}`}
                venue={`Venue: ${event.venue}`}
                contact={`Faculty Coordinator: ${
                  event.facultyCoordinators?.[0]?.name || "N/A"
                }`}
                description={event.description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
