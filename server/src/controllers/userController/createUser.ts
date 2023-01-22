import { Request, Response } from "express";
import User from "../../models/User";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";
const bcrypt = require("bcryptjs");

export async function createUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const email: string = req.body.email;
  const password: string = req.body.password;

  const encryptedPass = await bcrypt.hash(password, 10);

  try {
    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(400).json("User exist!");
    }
    const newUser = await User.create({
      email,
      username,
      password: encryptedPass,
    });

    const token = jwt.sign({ email: email, id: newUser._id }, JWT_SECRET, {
      expiresIn: 60,
    });

    res.status(200).json({ newUser, token });
  } catch (err) {
    res.status(400).json("Error");
  }
}
