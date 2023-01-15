import React, { useState, useEffect } from "react";

import { resetPass } from "./api/userApi/resetPass";
import { updatePass } from "./api/userApi/updatePass";

export default function Reset() {
  const [username, setUsername] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");

  const [showReset, setShowReset] = useState<boolean>(false);

  const [resetLink, setResetLink] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the users account exists, if so, show the reset form
    // And extract the token we passed using our resetPass api
    try {
      const data = await resetPass(username);
      setShowReset(true);
      setResetLink(data.resetLink);
    } catch (err) {
      console.log(err);
    }
  };

  // Execute the post method to update the users account
  const handlePassChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePass(resetLink, newPass);
      alert("Password successfully updated!");
      window.location.href = "./login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ paddingTop: "70px" }}>
      Reset Password
      {!showReset ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <form onSubmit={(e) => handlePassChange(e)}>
            <label htmlFor="newPass">Enter New Password</label>
            <input
              id="newPass"
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter New Password"
            />
            <label htmlFor="confirmPass">Confirm Password</label>
            <input id="confirmPass" placeholder="ConfirmPassword" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
