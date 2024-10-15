// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
