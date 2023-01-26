import React, { useState } from "react";

import { resetPass } from "./api/userApi/resetPass";

export default function ForgotPass() {
  const [email, setUserEmail] = useState<string>("");
  const [displayErr, setDisplayErr] = useState<boolean>(false);
  const [postErr, setPostErr] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "") {
      return setDisplayErr(true);
    }
    try {
      alert("If account exists, you should receive an email!");
      await resetPass(email.toLowerCase());
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="form-wrapper">
      <p style={{ margin: "0" }}>Reset Password</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && email == "" ? "red" : "transparent"
            }`,
          }}
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
