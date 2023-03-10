import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Deck from "./Deck";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import User from "./User";
import ResetPass from "./ResetPass";
import ForgotPass from "./ForgotPass";
import { NotFound } from "./NotFound";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/decks/:deckId/:userId" element={<Deck />} />
          <Route path="/reset-password" element={<ForgotPass />} />
          <Route path="/reset-password/:id/:resetId" element={<ResetPass />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-data" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
