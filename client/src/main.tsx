import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Deck from "./Deck";
import "./index.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import User from "./User";

const localLoggedIn = localStorage.getItem("loggedIn");
const loggedIn: boolean = localLoggedIn && JSON.parse(localLoggedIn);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/decks/:deckId" element={<Deck />} />

          {!loggedIn && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          {loggedIn && <Route path="/user-data" element={<User />} />}
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
