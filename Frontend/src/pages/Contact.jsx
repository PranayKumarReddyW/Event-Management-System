import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const ContactUs = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  // Fetch faculty data from the API
  const fetchFacultyData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/faculty-coordinators`
      );
      setFacultyData(response.data.facultyCoordinators);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  // Fetch student data from the API
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student-coordinators`
      );
      setStudentData(response.data.studentCoordinators);
      console.log(response.data.studentCoordinators);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchFacultyData();
    fetchStudentData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-[90vw] md:max-w-3xl overflow-y-auto h-[90vh]">
        <Typography
          variant="h5"
          className="text-white text-center mb-6 font-bold"
        >
          Contact Us
        </Typography>

        {/* Faculty Organizers Section */}
        <Typography variant="h6" className="text-orange-400 mb-4 font-semibold">
          Faculty Organizers
        </Typography>
        <TableContainer component={Paper} className="shadow-md mb-6">
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-r from-gray-500 to-purple-300">
                <TableCell className="text-white font-semibold">
                  S.No.
                </TableCell>
                <TableCell className="text-white font-semibold">Name</TableCell>
                <TableCell className="text-white font-semibold">
                  Event Name
                </TableCell>
                <TableCell className="text-white font-semibold">
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facultyData.map((row, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.events?.length > 0
                      ? row.events.map((event) => event.title).join(", ") // Join event titles with a comma
                      : "No Event Available"}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Student Organizers Section */}
        <Typography variant="h6" className="text-orange-400 mb-4 font-semibold">
          Student Organizers
        </Typography>
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-r from-gray-500 to-purple-300">
                <TableCell className="text-white font-semibold">
                  S.No.
                </TableCell>
                <TableCell className="text-white font-semibold">Name</TableCell>
                <TableCell className="text-white font-semibold">
                  Event Name
                </TableCell>
                <TableCell className="text-white font-semibold">Year</TableCell>
                <TableCell className="text-white font-semibold">
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.map((row, index) => (
                <TableRow
                  key={index + 1}
                  className="hover:bg-gray-700 transition-colors duration-300"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.events?.length > 0
                      ? row.events.map((event) => event.title).join(", ") // Join event titles with a comma
                      : "No Event Available"}
                  </TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ContactUs;
