import React, { useReducer, useState } from "react";
import "./Signup.css";

export type User = {
  username: string;
  password: string;
};

export default function Signup() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
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
