import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.myFooter}`}>
      <p>© 2024 My Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
