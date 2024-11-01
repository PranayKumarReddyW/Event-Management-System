import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input as AntInput } from "antd"; // Ant Design
import { Label } from "../components/ui/label"; // Shadcn
import axios from "axios"; // Import Axios for API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { toast } from "react-toastify"; // Import toast for notifications
import { useAuth } from "../context/AuthContext"; // Import useAuth to access AuthContext

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Initialize navigate function
  const { login } = useAuth(); // Use login function from AuthContext
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, data, {
        withCredentials: true, // Include cookies in the request
      });

      if (response.data.success) {
        // Use the login function from AuthContext
        const { token, user } = response.data; // Assuming the response contains user data
        login(user, token); // Set user data and token in context
        toast.success("Login successful!"); // Show success toast
        navigate("/"); // Redirect to home page
      } else {
        toast.error(response.data.message); // Show error toast if login fails
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed: An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-indigo-900">
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <Label className="text-white" htmlFor="email">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <AntInput
                  id="login-email"
                  {...field}
                  className="mt-2"
                  placeholder="Enter your email"
                  size="large"
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Label className="text-white" htmlFor="password">
              Password
            </Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <AntInput
                  id="login-password"
                  {...field}
                  className="mt-2 bg-white"
                  type="password"
                  placeholder="Enter your password"
                  size="large"
                />
              )}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")} // Navigate to the Sign Up page
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
