import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={`${styles.logoWrapper}`}>
        <Link to="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
        <h1>My Blog</h1>
      </div>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}
    </header>
  );
};

export default Header;
