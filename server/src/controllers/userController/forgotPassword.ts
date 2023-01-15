import { Request, Response } from "express";
import User from "../../models/User";

import { API_URL } from "../../utils/config";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";

export async function forgotPassword(req: Request, res: Response) {
  const username: string = req.body.username;

  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.send("User does not exist");
    }

    const secret = JWT_SECRET + userExists.password;
    const token = jwt.sign(
      { username: userExists.username, id: userExists._id },
      secret,
      { expiresIn: "5m" }
    );
    const link = `${API_URL}/reset-password/${userExists._id}/${token}`;
    res.json({ resetLink: link });
  } catch (err) {}
}
