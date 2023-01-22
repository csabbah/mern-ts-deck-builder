import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export type User = {
  email: string;
  password: string;
};

import { login } from "./api/userApi/login";

export default function Login() {
  const [postErr, setPostErr] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return setDisplayErr(true);
    }

    try {
      const user = await login(userData.email, userData.password);

      if (user.token) {
        // Essentially if login is successful, add the token to localStorage
        localStorage.setItem("token", user.token);
        localStorage.setItem("loggedIn", JSON.stringify(true));

        // And redirect to this page
        window.location.href = "./user-data";
      }
    } catch (err) {
      setPostErr(true);
    }
  };

  const [displayErr, setDisplayErr] = useState<boolean>(false);

  return (
    <div className="login-container">
      Login
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && userData.email == "" ? "red" : ""
            }`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayErr(false);
            setUserData({ ...userData, email: e.target.value });
          }}
          placeholder="Email"
          id="email"
        />
        {displayErr && userData.email == "" && (
          <p style={{ color: "red", marginTop: "-10px", marginBottom: "10px" }}>
            Missing data
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && userData.password == "" ? "red" : ""
            }`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayErr(false);
            setUserData({ ...userData, password: e.target.value });
          }}
          placeholder="Password"
          id="password"
        />
        {displayErr && userData.password == "" && (
          <p style={{ color: "red", marginTop: "-10px", marginBottom: "10px" }}>
            Missing data
          </p>
        )}
        <button type="submit">Submit</button>
        {postErr && (
          <p style={{ margin: "10px 0", marginTop: "0", color: "red" }}>
            Something went wrong, try again
          </p>
        )}
      </form>
      <Link style={{ color: "white" }} to={`/reset-password`}>
        Forgot Password
      </Link>{" "}
    </div>
  );
}
