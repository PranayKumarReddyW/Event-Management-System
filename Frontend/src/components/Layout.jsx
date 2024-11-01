// src/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the path if needed

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
