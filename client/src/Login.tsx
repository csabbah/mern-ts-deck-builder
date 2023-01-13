import React, { useState } from "react";
import "./Login.css";

export type User = {
  username: string;
  password: string;
};

import { login } from "./api/userApi/login";

export default function Login() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = await login(userData.username, userData.password);

    console.log(user);
  };

  return (
    <div className="login-container">
      Login
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
