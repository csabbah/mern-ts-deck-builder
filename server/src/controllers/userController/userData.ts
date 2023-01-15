import { Request, Response } from "express";
import User from "../../models/User";

const JWT_SECRET = "mysecretsshhhhh";

const jwt = require("jsonwebtoken");

export async function userData(req: Request, res: Response) {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET, (err: string, res: string) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const email = user.email;
    User.findOne({ email: email })
      .then((data) => {
        return res.send({ status: "ok", data: data });
      })
      .catch((err) => res.status(400).json("Error"));
  } catch (err) {
    res.json("Error");
  }
}
