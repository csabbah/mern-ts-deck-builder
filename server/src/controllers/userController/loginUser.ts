import { Request, response, Response } from "express";
import User from "../../models/User";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "vdsaivndsignag2309jaoisndf";
const bcrypt = require("bcryptjs");

export async function loginUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const payload = { username, password };

  const userExist = await User.findOne({ username });

  if (!userExist) {
    return res.status(400).json("User not found!");
  }

  if (await bcrypt.compare(password, userExist.password)) {
    const token = jwt.sign({ data: payload }, JWT_SECRET);

    if (res.status(201)) {
      return res.status(200).json({ token });
    } else {
      return res.status(400).json("Login error");
    }
  }

  return res.status(400).json("Password Incorrect");
}
