import React, { useState, useEffect } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  decks: string[];
};

import { userData } from "./api/userApi/userData";
import { logout } from "./utils/auth";

export default function User() {
  const [data, setData] = useState<User>({
    _id: "",
    username: "",
    email: "",
    password: "",
    decks: [],
  });

  const getUser = async () => {
    try {
      const dbUser = await userData();
      if (dbUser.data == "token expired") {
        return logout();
      }
      setData(dbUser.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ paddingTop: "70px", margin: "0 auto" }}>
      {data ? <div>Logged in as: {data.username} </div> : "not logged in"}
    </div>
  );
}
