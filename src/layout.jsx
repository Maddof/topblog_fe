// src/components/Layout.jsx
import React from "react"; // Import the React library
import { Outlet } from "react-router-dom"; // Import Outlet for rendering child routes
import Header from "./components/header/Header"; // Import the Header component
import Footer from "./components/footer/Footer"; // Import the Footer component

// Define the Layout component
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />{" "}
        {/* Renders the matched child route based on the current URL */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
