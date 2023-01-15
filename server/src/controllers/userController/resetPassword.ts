import { Request, Response } from "express";
import User from "../../models/User";

import { API_URL } from "../../utils/config";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";
const bcrypt = require("bcryptjs");

export async function resetPassword(req: Request, res: Response) {
  const id: string = req.params.id;
  const token: string = req.params.token;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User not found." });
  }
  const secret = JWT_SECRET + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    res.send("Verified");
  } catch (err) {
    res.send("Not verified");
  }
}
