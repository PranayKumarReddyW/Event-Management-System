import React, { useEffect, useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const eventDate = new Date(targetDate);

      // Check if the event date is valid
      if (isNaN(eventDate.getTime())) {
        console.error("Invalid target date:", targetDate);
        setTimeLeft({});
        return;
      }

      const difference = eventDate - now;

      if (difference <= 0) {
        setTimeLeft({}); // Event has started
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 100); // Update every 100 ms

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center mb-4">
      <h2 className="text-3xl text-yellow-300 font-bold mb-6 animate-bounce">
        Countdown to Event
      </h2>

      {timeLeft.days !== undefined ? (
        <div className="flex justify-center space-x-2">
          {" "}
          {/* Reduced space between boxes */}
          <div className="flex flex-col items-center bg-yellow-400 p-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Text className="text-3xl font-bold">{timeLeft.days}</Text>{" "}
            {/* Reduced text size */}
            <Text className="text-sm">Days</Text> {/* Reduced text size */}
          </div>
          <div className="flex flex-col items-center bg-green-400 p-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Text className="text-3xl font-bold">{timeLeft.hours}</Text>{" "}
            {/* Reduced text size */}
            <Text className="text-sm">Hours</Text> {/* Reduced text size */}
          </div>
          <div className="flex flex-col items-center bg-blue-400 p-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Text className="text-3xl font-bold">{timeLeft.minutes}</Text>{" "}
            {/* Reduced text size */}
            <Text className="text-sm">Minutes</Text> {/* Reduced text size */}
          </div>
          <div className="flex flex-col items-center bg-purple-400 p-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Text className="text-3xl font-bold">{timeLeft.seconds}</Text>{" "}
            {/* Reduced text size */}
            <Text className="text-sm">Seconds</Text> {/* Reduced text size */}
          </div>
        </div>
      ) : (
        <Text className="text-lg text-red-500">Event has started!</Text>
      )}
    </div>
  );
};

export default CountdownTimer;
