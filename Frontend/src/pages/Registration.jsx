import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select as AntSelect } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const branches = [
  "CSE",
  "CSE DS",
  "CSE BS",
  "EEE",
  "CIVIL",
  "MECH",
  "ECE",
  "MBA",
  "MCA",
  "AIML",
  "CYBER SECURITY",
];

const years = ["1", "2", "3", "4"];

export default function EventRegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch, // Use watch to retrieve form values
  } = useForm();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred while registering");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (id, type, placeholder, validationRules) => (
    <div className="flex flex-col space-y-2 w-full mt-4">
      <Label htmlFor={id} className="text-white">
        {placeholder}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(id, validationRules)}
      />
      {errors[id] && <span className="text-red-400">{errors[id].message}</span>}
    </div>
  );

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-grey-800 to-indigo-900">
      <div className="w-full max-w-[300px] md:max-w-[550px] mx-auto p-4 md:p-8 shadow-input bg-gradient-to-br from-gray-800 to-grey-600 text-white rounded-2xl p-6 lg:p-8">
        <h2 className="font-bold text-xl text-white text-center">
          Register for the Event
        </h2>
        <p className="text-neutral-300 text-sm max-w-sm mt-2 text-center">
          Fill in your details below to complete your registration.
        </p>
        <form className="my-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <>
              {renderInputField("name", "text", "Full Name", {
                required: "Required",
              })}
              {renderInputField("email", "email", "Email Address", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              {renderInputField(
                "registrationNumber",
                "text",
                "Registration Number",
                {
                  required: "Required",
                  validate: {
                    invalidFormat: (value) =>
                      /^[2][0-9]{4}[A][0-9]{4}$/.test(value) ||
                      "Invalid format (like 21091A3201)",
                  },
                }
              )}
              <button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-br from-gray-700 to-gray-500 w-full text-white rounded-md h-10 font-medium mt-8"
              >
                Next →
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex flex-col space-y-2 w-full mt-4">
                <Label htmlFor="branch" className="text-white">
                  Branch
                </Label>
                <AntSelect
                  placeholder="Select your branch"
                  className="w-full"
                  onChange={(value) => {
                    setValue("branch", value);
                    trigger("branch"); // Trigger validation
                  }}
                  value={watch("branch")} // Keep the value
                >
                  {branches.map((branch) => (
                    <AntSelect.Option key={branch} value={branch}>
                      {branch}
                    </AntSelect.Option>
                  ))}
                </AntSelect>
                {errors.branch && (
                  <span className="text-red-400">{errors.branch.message}</span>
                )}
              </div>
              {renderInputField("section", "text", "Section", {
                required: "Required",
                validate: {
                  invalidSection: (value) =>
                    /^[A-E]$/.test(value) || "Must be A to E",
                },
              })}
              {renderInputField("phoneNumber", "tel", "Phone Number", {
                required: "Required",
                validate: {
                  invalidFormat: (value) =>
                    /^(9|8|7|6)[0-9]{9}$/.test(value) ||
                    "Must start with 9, 8, 7, or 6 and be 10 digits",
                },
              })}
              <div className="flex flex-col space-y-2 w-full mt-4">
                <Label htmlFor="year" className="text-white">
                  Year
                </Label>
                <AntSelect
                  placeholder="Select your year"
                  className="w-full"
                  onChange={(value) => {
                    setValue("year", value);
                    trigger("year"); // Trigger validation
                  }}
                  value={watch("year")} // Keep the value
                >
                  {years.map((year) => (
                    <AntSelect.Option key={year} value={year}>
                      {year}
                    </AntSelect.Option>
                  ))}
                </AntSelect>
                {errors.year && (
                  <span className="text-red-400">{errors.year.message}</span>
                )}
              </div>
              {renderInputField("password", "password", "Password", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
              <button
                className="bg-gradient-to-br from-gray-700 to-gray-500 w-full text-white rounded-md h-10 font-medium mt-8"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register Now →"}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="bg-gray-500 text-white w-full rounded-md h-10 font-medium mt-4"
              >
                ← Back
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
