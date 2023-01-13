import { Request, Response } from "express";
import User from "../../models/User";

const JWT_SECRET = "vdsaivndsignag2309jaoisndf";
const jwt = require("jsonwebtoken");

export async function userData(req: Request, res: Response) {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const username = user.username;
    User.findOne({ username })
      .then((data) => {
        res.send({ status: "ok", data });
      })
      .catch((err) => res.status(400).json("Error"));
  } catch (err) {
    res.status(400).json("Error");
  }
}
