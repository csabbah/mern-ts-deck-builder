import { Request, Response } from "express";
import User from "../../models/User";

import { API_URL } from "../../utils/config";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";
const bcrypt = require("bcryptjs");

// We rerun the bycrypt We used initial to create a user
export async function updatePassword(req: Request, res: Response) {
  const id: string = req.params.id;
  const token: string = req.params.token;
  const password: string = req.body.password;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User not found." });
  }
  const secret = JWT_SECRET + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPass = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: encryptedPass,
        },
      }
    );
    res.json({ status: "Password updated!" });
  } catch (err) {
    res.send({ status: "Something went wrong!" });
  }
}
