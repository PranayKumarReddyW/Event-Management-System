import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../components/ui/form";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const EventForm = () => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      date: "",
      venue: "",
      cost: "",
      studentCoordinators: [],
      facultyCoordinators: [],
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = methods;

  const [facultyCoordinators, setFacultyCoordinators] = useState([]);
  const [studentCoordinators, setStudentCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.name,
      description: data.description.split("\n"), // Split description by newline into an array
      date: data.date,
      venue: data.venue,
      cost: data.cost,
      studentCoordinators: data.studentCoordinators,
      facultyCoordinators: data.facultyCoordinators,
    };

    try {
      console.log(formattedData);
      await axios.post(`${apiUrl}/events/create`, formattedData);
      alert("Event created successfully!");
      reset(); // Reset the form
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error creating event";
      setErrorState(errorMsg);
      alert(errorMsg);
    }
  };

  const fetchFacultyCoordinators = async () => {
    try {
      const response = await axios.get(`${apiUrl}/faculty-coordinators`);
      setFacultyCoordinators(response.data.facultyCoordinators);
    } catch (err) {
      setErrorState("Failed to fetch faculty coordinators.");
    }
  };

  const fetchStudentCoordinators = async () => {
    try {
      const response = await axios.get(`${apiUrl}/student-coordinators`);
      setStudentCoordinators(response.data.studentCoordinators);
    } catch (err) {
      setErrorState("Failed to fetch student coordinators.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchFacultyCoordinators(),
        fetchStudentCoordinators(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Checkbox Dropdown function integrated directly in the EventForm
  const CheckboxDropdown = ({ options, selectedValues, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => setIsOpen((prev) => !prev);

    const handleCheckboxChange = (id) => {
      if (selectedValues.includes(id)) {
        onChange(selectedValues.filter((value) => value !== id));
      } else {
        onChange([...selectedValues, id]);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={handleToggleDropdown}
          className="bg-gray-700 text-white p-2 rounded w-full text-left"
        >
          {selectedValues.length > 0
            ? selectedValues
                .map((id) => options.find((option) => option._id === id)?.name)
                .join(", ")
            : label}
        </button>
        {isOpen && (
          <div className="absolute bg-gray-800 rounded mt-1 z-10 w-full">
            {options.map((option) => (
              <label
                key={option._id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-600 text-white"
              >
                <input
                  type="checkbox"
                  value={option._id}
                  checked={selectedValues.includes(option._id)}
                  onChange={() => handleCheckboxChange(option._id)}
                  className="mr-2 accent-white"
                />
                {option.name}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-blue-950 min-h-screen overflow-auto">
      <div className="h-screen py-10 w-11/12 mx-auto ">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-xl font-bold mb-4 text-white">Create Event</h2>

            {/* Event Name */}
            <FormItem>
              <FormLabel className="text-white">Event Name</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter event name"
                      className="bg-gray-700 text-white"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.name?.message}
              </FormMessage>
            </FormItem>

            {/* Description */}
            <FormItem>
              <FormLabel className="text-white">Description</FormLabel>
              <FormControl>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Enter event description"
                      className="bg-gray-700 text-white"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.description?.message}
              </FormMessage>
            </FormItem>

            {/* Date */}
            <FormItem>
              <FormLabel className="text-white">Date</FormLabel>
              <FormControl>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      className="bg-gray-700 text-white"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.date?.message}
              </FormMessage>
            </FormItem>

            {/* Venue */}
            <FormItem>
              <FormLabel className="text-white">Venue</FormLabel>
              <FormControl>
                <Controller
                  name="venue"
                  control={control}
                  rules={{ required: "Venue is required" }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter event venue"
                      className="bg-gray-700 text-white"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.venue?.message}
              </FormMessage>
            </FormItem>

            {/* Cost */}
            <FormItem>
              <FormLabel className="text-white">Cost</FormLabel>
              <FormControl>
                <Controller
                  name="cost"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter event cost"
                      className="bg-gray-700 text-white"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.cost?.message}
              </FormMessage>
            </FormItem>

            {/* Student Coordinators Dropdown */}
            <FormItem>
              <FormLabel className="text-white">Student Coordinators</FormLabel>
              <FormControl>
                <Controller
                  name="studentCoordinators"
                  control={control}
                  render={({ field }) => (
                    <CheckboxDropdown
                      options={studentCoordinators}
                      selectedValues={field.value}
                      onChange={field.onChange}
                      label="Select Student Coordinators"
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.studentCoordinators?.message}
              </FormMessage>
            </FormItem>

            {/* Faculty Coordinators Dropdown */}
            <FormItem>
              <FormLabel className="text-white">Faculty Coordinators</FormLabel>
              <FormControl>
                <Controller
                  name="facultyCoordinators"
                  control={control}
                  render={({ field }) => (
                    <CheckboxDropdown
                      options={facultyCoordinators}
                      selectedValues={field.value}
                      onChange={field.onChange}
                      label="Select Faculty Coordinators"
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.facultyCoordinators?.message}
              </FormMessage>
            </FormItem>
            <div className="flex justify-center">
              <Button type="submit" className="bg-green-600 mt-3">
                Create Event
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EventForm;
