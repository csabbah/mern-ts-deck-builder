import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Deck from "./Deck";
import "./index.css";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Header } from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import User from "./User";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/decks/:deckId", element: <Deck /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/user-data", element: <User /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <Header />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
