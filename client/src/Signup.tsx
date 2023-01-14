import React, { useState } from "react";
import "./Signup.css";

import { postUser } from "./api/userApi/postUser";

export type User = {
  username: string;
  password: string;
  token: string;
};

export default function Signup() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    token: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = await postUser(userData.username, userData.password);

    console.log(user.token);
    localStorage.setItem("token", user.token);
    localStorage.setItem("loggedIn", JSON.stringify(true));

    // And redirect to this page
    window.location.href = "./user-data";
  };

  return (
    <div className="signup-container">
      Sign up
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, username: e.target.value })
          }
          placeholder="Username"
          id="username"
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
    </div>
  );
}
