import { Request, Response } from "express";
import User from "../../models/User";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";
const bcrypt = require("bcryptjs");

export async function loginUser(req: Request, res: Response) {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res.status(400).json("User not found!");
  }

  if (await bcrypt.compare(password, userExist.password)) {
    const token = jwt.sign({ email: userExist.email }, JWT_SECRET, {
      expiresIn: 10,
    });

    if (res.status(201)) {
      return res.status(200).json({ token, userExist });
    } else {
      return res.status(400).json("Login error");
    }
  }

  return res.status(400).json("Password Incorrect");
}
