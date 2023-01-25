import React, { useState } from "react";

import { updatePass } from "./api/userApi/updatePass";

export default function ResetPass() {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [passErr, setPassErr] = useState<boolean>(false);

  const [postErr, setPostErr] = useState<boolean>(false);
  const [displayErr, setDisplayErr] = useState<boolean>(false);

  // Execute the post method to update the users account
  const handlePassChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass != confirmPass) {
      return setPassErr(true);
    }
    if (newPass == "") {
      return setDisplayErr(true);
    }

    try {
      const status = await updatePass(window.location.href, newPass);
      if (status.status == "Something went wrong!") {
        alert("Token expired, please try again!");
      } else {
        alert("Password successfully updated!");
      }
      window.location.href = "/login";
    } catch (err) {
      setPostErr(true);
    }
  };

  const resetState = (): void => {
    setDisplayErr(false);
    setPostErr(false);
    setPassErr(false);
  };

  return (
    <div className="form-wrapper">
      <p style={{ margin: "0" }}>Reset Password</p>
      <form
        onSubmit={(e) => {
          handlePassChange(e);
        }}
      >
        <label htmlFor="newPass">Enter New Password</label>
        <input
          style={{
            border: `1.5px solid ${
              (displayErr || passErr) && (newPass == "" || passErr)
                ? "red"
                : "transparent"
            }`,
          }}
          id="newPass"
          onChange={(e) => {
            resetState();
            setNewPass(e.target.value);
          }}
          placeholder="Enter New Password"
        />
        {(displayErr || passErr) && (newPass == "" || passErr) && (
          <p style={{ color: "red", marginTop: "-10px", marginBottom: "10px" }}>
            {newPass == "" ? "Missing data" : ""}
          </p>
        )}
        <label htmlFor="confirmPass">Confirm Password</label>
        <input
          onChange={(e) => {
            resetState();
            setConfirmPass(e.target.value);
          }}
          style={{
            border: `1.5px solid ${
              (displayErr || passErr) && (confirmPass == "" || passErr)
                ? "red"
                : "transparent"
            }`,
          }}
          id="confirmPass"
          placeholder="ConfirmPassword"
        />
        {(displayErr || passErr) && (confirmPass == "" || passErr) && (
          <p style={{ color: "red", marginTop: "-10px", marginBottom: "10px" }}>
            {confirmPass == "" ? "Missing data" : ""}
          </p>
        )}
        <button type="submit">Submit</button>
        {postErr && (
          <p style={{ margin: "10px 0", marginTop: "0", color: "red" }}>
            Something went wrong, try again
          </p>
        )}
        {passErr && (
          <p style={{ margin: "10px 0", marginTop: "0", color: "red" }}>
            Passwords don't match!
          </p>
        )}
      </form>
    </div>
  );
}
