import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CoordinatorsList = () => {
  const [facultyCoordinators, setFacultyCoordinators] = useState([]);
  const [studentCoordinators, setStudentCoordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCoordinator, setNewCoordinator] = useState({ type: "faculty" });
  const [activeTab, setActiveTab] = useState("faculty");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const facultyResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/faculty-coordinators`
      );
      const studentResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/student-coordinators`
      );

      setFacultyCoordinators(facultyResponse.data.facultyCoordinators || []);
      setStudentCoordinators(studentResponse.data.studentCoordinators || []);
    } catch (error) {
      console.error("Error fetching coordinators", error);
      setFacultyCoordinators([]);
      setStudentCoordinators([]);
    }
  };

  const handleEdit = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/${
          selectedCoordinator.type
        }-coordinators/delete/${selectedCoordinator._id}`
      );
      setIsDeleteDialogOpen(false);
      fetchCoordinators();
    } catch (error) {
      console.error("Error deleting coordinator", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/${
          selectedCoordinator.type
        }-coordinators/update/${selectedCoordinator._id}`,
        selectedCoordinator
      );
      setIsEditDialogOpen(false);
      fetchCoordinators();
    } catch (error) {
      console.error("Error updating coordinator", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/${
          newCoordinator.type
        }-coordinators/register`,
        newCoordinator
      );
      setIsAddDialogOpen(false);
      fetchCoordinators();
    } catch (error) {
      console.error("Error adding coordinator", error);
    }
  };

  const handleChange = (e) => {
    setSelectedCoordinator({
      ...selectedCoordinator,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewChange = (e) => {
    setNewCoordinator({
      ...newCoordinator,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setNewCoordinator({ ...newCoordinator, type: e.target.value });
  };

  const filteredFacultyCoordinators = facultyCoordinators.filter(
    (coordinator) =>
      coordinator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudentCoordinators = studentCoordinators.filter(
    (coordinator) =>
      coordinator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Coordinators</h2>

      <div className="flex items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-3/4"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("faculty")}
          className={`${
            activeTab === "faculty"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          } border rounded px-4 py-2 transition duration-300`}
        >
          Faculty Coordinators
        </button>
        <button
          onClick={() => setActiveTab("student")}
          className={`${
            activeTab === "student"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          } border rounded px-4 py-2 transition duration-300`}
        >
          Student Coordinators
        </button>
      </div>

      {activeTab === "faculty" && (
        <>
          <h2 className="text-xl font-semibold mb-2">Faculty Coordinators</h2>
          <div className="space-y-4">
            {filteredFacultyCoordinators.length > 0 ? (
              filteredFacultyCoordinators.map((coordinator) => (
                <div
                  key={coordinator._id}
                  className="p-4 border rounded shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1 mb-2 md:mb-0">
                    <p>
                      <strong>Name:</strong> {coordinator.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {coordinator.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {coordinator.phone}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={() =>
                        handleEdit({ ...coordinator, type: "faculty" })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        handleDelete({ ...coordinator, type: "faculty" })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No faculty coordinators available.</p>
            )}
          </div>
        </>
      )}

      {activeTab === "student" && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Student Coordinators
          </h2>
          <div className="space-y-4">
            {filteredStudentCoordinators.length > 0 ? (
              filteredStudentCoordinators.map((coordinator) => (
                <div
                  key={coordinator._id}
                  className="p-4 border rounded shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1 mb-2 md:mb-0">
                    <p>
                      <strong>Name:</strong> {coordinator.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {coordinator.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {coordinator.phone}
                    </p>
                    <p>
                      <strong>Year:</strong> {coordinator.year}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={() =>
                        handleEdit({ ...coordinator, type: "student" })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        handleDelete({ ...coordinator, type: "student" })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No student coordinators available.</p>
            )}
          </div>
        </>
      )}

      {/* Add Coordinator Button */}
      <div className="flex justify-end mt-4">
        <Button onClick={() => setIsAddDialogOpen(true)}>
          Add Coordinator
        </Button>
      </div>

      {/* Add Coordinator Dialog */}
      {isAddDialogOpen && (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogTitle>Add Coordinator</DialogTitle>
            <DialogDescription>
              Fill in the details of the coordinator below.
            </DialogDescription>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Move the type dropdown to the top */}
              <select
                name="type"
                onChange={handleTypeChange}
                value={newCoordinator.type}
              >
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={newCoordinator.name || ""}
                onChange={handleNewChange}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={newCoordinator.email || ""}
                onChange={handleNewChange}
                required
              />
              <Input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={newCoordinator.phone || ""}
                onChange={handleNewChange}
                required
              />
              <Button onClick={handleAdd}>Add Coordinator</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CoordinatorsList;
