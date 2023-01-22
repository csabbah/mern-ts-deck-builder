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
    verifyOtp: false,
    otp: "",
    verified: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData.username || !userData.email || !userData.password) {
      return setDisplayErr(true);
    }

    try {
      const user: User = await postUser(
        userData.email,
        userData.username,
        userData.password
      );

      localStorage.setItem("token", user.token);
      localStorage.setItem("loggedIn", JSON.stringify(true));

      // And redirect to this page
      window.location.href = "./user-data";
    } catch (err) {
      console.log(err);
    }
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
    if (userData.mobile.length < 10) {
      return setDisplayErr(true);
    }

    // onCaptchVerify();
    // // This is our user state object that contains their sign up info
    // // + 1 is the area code
    // const phoneNumber = "+1" + userData.mobile;
    // const appVerifier = (window as any).recaptchaVerifier;

    // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //   // By doing window.confirmationResult, we're making this variable accessible anywhere
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     (window as any).confirmationResult = confirmationResult;
    //     alert("OTP sent");
    //     setVerification({ ...verification, verifyOtp: true });
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   });
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

  const [displayErr, setDisplayErr] = useState<boolean>(false);

  return (
    <div className="signup-container">
      <div id="recaptcha-container"></div>
      Sign up
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && userData.username == "" ? "red" : ""
            }`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayErr(false);
            setUserData({ ...userData, username: e.target.value });
          }}
          placeholder="Username"
          id="username"
        />
        {displayErr && userData.username == "" && (
          <p style={{ color: "red", marginTop: "-15px", marginBottom: "10px" }}>
            Missing data
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && userData.email == "" ? "red" : ""
            }`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayErr(false);
            setUserData({ ...userData, email: e.target.value });
          }}
          placeholder="Email"
          id="email"
        />
        {displayErr && userData.email == "" && (
          <p style={{ color: "red", marginTop: "-15px", marginBottom: "10px" }}>
            Missing data
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && userData.password == "" ? "red" : ""
            }`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayErr(false);
            setUserData({ ...userData, password: e.target.value });
          }}
          placeholder="Password"
          id="password"
        />
        {displayErr && userData.password == "" && (
          <p style={{ color: "red", marginTop: "-15px", marginBottom: "10px" }}>
            Missing data
          </p>
        )}
        {/* This input is for adding your number and activating the captcha */}
        <>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            style={{
              border: `1.5px solid ${
                displayErr && userData.mobile.length < 10 ? "red" : ""
              }`,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDisplayErr(false);
              setUserData({ ...userData, mobile: e.target.value });
            }}
            placeholder="Mobile"
            id="mobile"
          />
          {displayErr && userData.mobile.length < 10 && (
            <p
              style={{ color: "red", marginTop: "-15px", marginBottom: "10px" }}
            >
              Must be a valid number
            </p>
          )}
          <div>
            <button
              style={{
                marginTop: "0",
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
        </>
        {/* If verifyOtp is true, that means the code has been sent 
        so we show this input which handles Verifying the otp */}
        {verification.verifyOtp && (
          <>
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
          </>
        )}
        {!verification.verified ? (
          <button
            onClick={(e) => e.preventDefault()}
            style={{ opacity: "0.5" }}
          >
            Submit
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
