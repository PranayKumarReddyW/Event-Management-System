import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

// Function to format date to "day month year"
const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Schedule = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        if (response.data.success) {
          const groupedData = response.data.data.reduce((acc, event) => {
            const eventDate = new Date(event.date).toLocaleDateString();
            if (!acc[eventDate]) {
              acc[eventDate] = [];
            }
            acc[eventDate].push(event);
            return acc;
          }, {});

          const sortedData = Object.entries(groupedData).sort(
            ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
          );

          setScheduleData(sortedData);
        }
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []);

  const handleNext = () => {
    if (currentDayIndex < scheduleData.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-900 p-4 md:p-8 rounded-lg shadow-2xl w-full max-w-3xl min-h-[500px]">
        <Title style={{ color: "white" }} className="text-center mb-6">
          Event Schedule
        </Title>

        {scheduleData.length > 0 ? (
          <>
            <div className="flex justify-center items-center mb-4">
              {currentDayIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  <LeftOutlined />
                </button>
              )}
              <span className="text-white font-bold text-lg mx-4">
                {formatDate(scheduleData[currentDayIndex][0])}
              </span>
              {currentDayIndex < scheduleData.length - 1 && (
                <button
                  onClick={handleNext}
                  className="text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  <RightOutlined />
                </button>
              )}
            </div>

            {scheduleData[currentDayIndex][1].map((event, idx) => (
              <div
                key={idx}
                className="mb-4 text-white pb-4 border-b border-gray-600"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
                  <div className="col-span-1">
                    <span className="font-bold text-teal-300">
                      {new Date(event.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-orange-400">
                      {event.title}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col text-left">
                      {event.studentCoordinators.map((coordinator, cIdx) => (
                        <div key={cIdx} className="text-sm text-gray-400">
                          {typeof coordinator === "string"
                            ? coordinator
                            : coordinator.name || "Unknown Coordinator"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-white text-center mt-10">No events found.</div>
        )}
      </div>
    </div>
  );
};
export default Schedule;
