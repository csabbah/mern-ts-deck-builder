import React, { useState } from "react";

import { updatePass } from "./api/userApi/updatePass";

export default function ResetPass() {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [passErr, setPassErr] = useState<boolean>(false);

  const [apiLink, setApiLink] = useState<string | null>(
    localStorage.getItem("resetToken")
  );

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

    if (apiLink === null) {
      return setPostErr(true);
    }

    try {
      const status = await updatePass(apiLink!, newPass);
      if (status.status == "Something went wrong!") {
        alert("Token expired, please try again!");
        localStorage.clear();
      } else {
        alert("Password successfully updated!");
        localStorage.clear();
      }

      window.location.href = "/login";
    } catch (err) {
      localStorage.clear();
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
      Reset Password
      <form
        onSubmit={(e) => {
          handlePassChange(e);
        }}
      >
        <label htmlFor="newPass">Enter New Password</label>
        <input
          style={{
            border: `1.5px solid ${
              (displayErr || passErr) && (newPass == "" || passErr) ? "red" : ""
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
                : ""
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
            {apiLink === null
              ? "Token missing, trying again!"
              : "Something went wrong, try again"}
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
