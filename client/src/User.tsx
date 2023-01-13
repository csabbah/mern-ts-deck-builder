import React, { useState, useEffect } from "react";

export type User = {
  _id: string;
  username: string;
  password: string;
  decks: string[];
};

import { userData } from "./api/userApi/userData";

export default function User() {
  const [data, setData] = useState<User>({
    _id: "",
    username: "",
    password: "",
    decks: [],
  });

  const getUser = async () => {
    try {
      const dbUser = await userData();

      setData(dbUser.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ paddingTop: "70px" }}>
      {data ? <div>Logged in as: {data.username}</div> : "not logged in"}
    </div>
  );
}
