import React, { useState, useEffect } from "react";

import { resetPass } from "./api/userApi/resetPass";

export default function ForgotPass() {
  const [email, setUserEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert("Email sent!");
      await resetPass(email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      Reset Password
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
