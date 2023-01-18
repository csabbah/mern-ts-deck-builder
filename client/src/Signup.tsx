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
  email: string;
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
    email: "",
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

    const user: User = await postUser(
      userData.email,
      userData.username,
      userData.password
    );

    localStorage.setItem("token", user.token);
    localStorage.setItem("loggedIn", JSON.stringify(true));

    // And redirect to this page
    window.location.href = "./user-data";
  };

  const auth = getAuth(app); // We pass the app from the firebase-config file
  const onCaptchVerify = () => {
    // By doing window.recaptchaVerifier, we're making this variable accessible anywhere
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
    // This is our user state object that contains their sign up info
    // + 1 is the area code
    const phoneNumber = "+1" + userData.mobile;
    const appVerifier = (window as any).recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      // By doing window.confirmationResult, we're making this variable accessible anywhere
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
        <label htmlFor="email">Email</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, email: e.target.value })
          }
          placeholder="Email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          id="password"
        />
        {/* This input is for adding your number and activating the captcha */}
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
          {/* verifyButton will be set to true if mobile number length is == 10 */}
          {verification.verifyButton && (
            <div>
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
            </div>
          )}
        </div>
        {/* If verifyOtp is true, that means the code has been sent 
        so we show this input which handles Verifying the otp */}
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
        {!verification.verified ? (
          <button
            onClick={(e) => e.preventDefault()}
            style={{ opacity: "0.5" }}
          >
            Submit
          </button>
        ) : (
          <button type="submit">Suces</button>
        )}
      </form>
    </div>
  );
}
