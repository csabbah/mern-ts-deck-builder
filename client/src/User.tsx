import React, { useState, useEffect } from "react";

export type User = {
  username: string;
  password: string;
};

export default function User() {
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });

  useEffect(() => {}, []);

  return <div style={{ paddingTop: "70px" }}>Logged in as:</div>;
}
