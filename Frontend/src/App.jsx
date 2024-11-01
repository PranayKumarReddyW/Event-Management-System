import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import RegistrationPage from "./pages/Registration";
import SchedulePage from "./pages/Schedule";
import ContactPage from "./pages/Contact";
import RegisterEvents from "./pages/RegisterEvents";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEvent from "./pages/AddEvent";
import CoordinatorsList from "./pages/CordinatorsList";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/registerEvents"
          element={
            <ProtectedRoute roles={["Student"]} element={<RegisterEvents />} />
          }
        />
        <Route
          path="/coordinators"
          element={
            <ProtectedRoute roles={["Admin"]} element={<CoordinatorsList />} />
          }
        />
        <Route
          path="/addEvent"
          element={<ProtectedRoute roles={["Admin"]} element={<AddEvent />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute roles={["Admin"]} element={<Dashboard />} />}
        />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
