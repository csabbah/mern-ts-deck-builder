import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsMoonFill, BsUiChecksGrid } from "react-icons/bs";
import { RiSunFill } from "react-icons/ri";

import { loggedIn, logout } from "./utils/auth";

export function Header() {
  const colorMode = localStorage.getItem("colorMode");
  const [darkMode, setDarkMode] = useState<boolean>(colorMode === "dark");

  useEffect(() => {
    const body = document.body;
    body?.classList.remove(darkMode ? "light" : "dark");
    body?.classList.add(darkMode ? "dark" : "light");
    localStorage.setItem("colorMode", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="Header">
      <div className="container">
        <div>
          <Link to={`/`}>Decks</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{ outline: "none" }}
            onClick={() => setDarkMode(!darkMode)}
            className={`color-btn ${darkMode ? "dark" : "light"}`}
          >
            <span
              className={`color-outline ${darkMode ? "light" : "dark"}`}
            ></span>
            <BsMoonFill className={`dark-icon ${darkMode ? "active" : ""}`} />
            <RiSunFill className={`light-icon ${darkMode ? "" : "active"}`} />
          </button>
          <div style={{ display: "flex", gap: "10px" }}>
            {loggedIn() ? (
              <>
                <Link to={`/user-data`}>Account</Link>
                <a onClick={() => logout()}>Logout</a>
              </>
            ) : (
              <>
                <Link to={`/login`}>Login</Link>
                <Link to={`/signup`}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
