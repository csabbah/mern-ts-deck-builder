import React, { useState, useEffect } from "react";

import { resetPass } from "./api/userApi/resetPass";

export default function ForgotPass() {
  const [email, setUserEmail] = useState<string>("");
  const [displayErr, setDisplayErr] = useState<boolean>(false);
  const [postErr, setPostErr] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return setDisplayErr(true);
    }

    try {
      alert(
        "Email sent! If account exists, you should receive an email shortly."
      );
      const apiLink = await resetPass(email);
      // Clear local (incase a previous older token is there)
      localStorage.clear();
      localStorage.setItem("resetToken", apiLink);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-wrapper">
      Reset Password
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={(e) => {
            setDisplayErr(false);
            setPostErr(false);
            setUserEmail(e.target.value);
          }}
          placeholder="Enter Email"
        />
        {displayErr && email == "" && (
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
    </div>
  );
}
