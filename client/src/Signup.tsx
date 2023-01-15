import React, { useState } from "react";
import "./Signup.css";

import { postUser } from "./api/userApi/postUser";
import app from "./utils/firebase-config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export type User = {
  username: string;
  password: string;
  token: string;
  mobile: string;
};

export type Verify = {
  verifyButton: boolean;
  verifyOtp: boolean;
  otp: string;
  verified: boolean;
};

export default function Signup() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    token: "",
    mobile: "",
  });

  const [verification, setVerification] = useState<Verify>({
    verifyButton: false,
    verifyOtp: false,
    otp: "",
    verified: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = await postUser(userData.username, userData.password);

    localStorage.setItem("token", user.token);
    localStorage.setItem("loggedIn", JSON.stringify(true));

    // And redirect to this page
    window.location.href = "./user-data";
  };

  const auth = getAuth(app); // We pass the app from the firebase-config file
  const onCaptchVerify = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          onSignInSubmit();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    onCaptchVerify();
    const phoneNumber = "+1" + userData.mobile; // This is our user state object that contains their sign up info
    const appVerifier = (window as any).recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        (window as any).confirmationResult = confirmationResult;
        alert("OTP sent");
        setVerification({ ...verification, verifyOtp: true });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  const verifyCode = () => {
    // We assigned confirmationResult as a global variable so we can access it here too
    (window as any).confirmationResult
      .confirm(verification.otp)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        alert("Verification success!");
        setVerification({ ...verification, verified: true, verifyOtp: false });
        // ...
      })
      .catch((error: string) => {
        alert("Invalid OTP!");

        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <div className="signup-container">
      <div id="recaptcha-container"></div>
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
        <div>
          <label htmlFor="phone-number">Phone Number</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData({ ...userData, mobile: e.target.value });
              if (userData.mobile.length == 9) {
                setVerification({ ...verification, verifyButton: true });
              } else {
                setVerification({ ...verification, verifyButton: false });
              }
            }}
            placeholder="Enter phone number"
            id="phone-number"
          />
          {verification.verifyButton && (
            <button
              style={{
                backgroundColor: verification.verified
                  ? "green"
                  : "rgb(220, 220, 220)",
              }}
              onClick={() => {
                onSignInSubmit();
              }}
              type="button"
              value="Verify"
            >
              {verification.verified ? "Verified" : "Verify"}
            </button>
          )}
        </div>
        {verification.verifyOtp && (
          <div>
            <label htmlFor="verification-code">Verification Code</label>
            <input
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVerification({ ...verification, otp: e.target.value })
              }
              placeholder="Enter code"
              id="verification-code"
            />
            <button onClick={() => verifyCode()} type="button" value="Verify">
              Verify Code
            </button>
          </div>
        )}
        <button disabled={!verification.verified} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
