import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    branch: [],
    year: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/students`
        );
        const users = response.data.data;

        // Filter out duplicate users based on their IDs
        const uniqueUsers = Array.from(
          new Map(users.map((user) => [user._id, user])).values()
        );

        setData(uniqueUsers);

        const branches = [
          ...new Set(uniqueUsers.map((user) => user.branch)),
        ].map((branch) => ({ text: branch, value: branch }));
        const years = [...new Set(uniqueUsers.map((user) => user.year))].map(
          (year) => ({ text: year, value: year })
        );

        setFilters({ branch: branches, year: years });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      className: "font-bold border-black border",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      filters: filters.branch,
      onFilter: (value, record) => record.branch === value,
      width: "20%",
      className: "font-bold border-black border",
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: filters.year,
      onFilter: (value, record) => record.year === value,
      width: "20%",
      className: "font-bold border-black border",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      className: "font-bold border-black border",
    },
    {
      title: "Events Registered",
      dataIndex: "eventsRegistered",
      render: (events) => (events.length > 0 ? events.join(", ") : "None"),
      width: "20%",
      className: "font-bold border-black border",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="m-4 mb-8 border-b border-black">
      <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-gray-500 to-black text-center p-4 rounded-md shadow-lg transition duration-300">
        Registered Students
      </h2>
      <Table
        rowKey="_id" // Specify the unique key for each row
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
        rowClassName="border-black border transition duration-200 hover:bg-gray-100"
        scroll={{ x: 768 }}
        size="middle"
        className="mt-4 shadow-md rounded-lg"
      />
    </div>
  );
};

export default UserTable;
