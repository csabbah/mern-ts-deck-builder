import React, { useState, useEffect } from "react";

import { updatePass } from "./api/userApi/updatePass";

export default function ResetPass() {
  const [newPass, setNewPass] = useState<string>("");

  // Execute the post method to update the users account
  const handlePassChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const status = await updatePass(window.location.href, newPass);
      if (status.status == "Something went wrong!") {
        alert("Token expired, please try again!");
      } else {
        alert("Password successfully updated!");
      }
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      Reset Password
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
  );
}
