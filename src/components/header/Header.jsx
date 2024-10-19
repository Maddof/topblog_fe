import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../config/AuthContext";

const Header = () => {
  const { accessToken } = useAuth();

  return (
    <header>
      <div className={`${styles.logoWrapper}`}>
        <Link to="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li>
              {accessToken ? "Logged in" : <Link to="/login">Login</Link>}
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
