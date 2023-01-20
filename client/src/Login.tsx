import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export type User = {
  email: string;
  password: string;
};

import { login } from "./api/userApi/login";

export default function Login() {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await login(userData.email, userData.password);

    if (user.token) {
      // Essentially if login is successful, add the token to localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("loggedIn", JSON.stringify(true));

      // And redirect to this page
      window.location.href = "./user-data";
    }
  };

  return (
    <div className="login-container">
      Login
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, email: e.target.value })
          }
          placeholder="Email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          id="password"
        />
        <button type="submit">Submit</button>
      </form>
      <Link style={{ color: "white" }} to={`/reset-password`}>
        Forgot Password
      </Link>{" "}
    </div>
  );
}
