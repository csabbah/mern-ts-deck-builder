import React, { useState, useEffect } from "react";

import { resetPass } from "./api/userApi/resetPass";

export default function Reset() {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await resetPass(username);

    console.log(data);
  };
  return (
    <div style={{ paddingTop: "70px" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
