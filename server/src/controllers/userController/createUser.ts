import { Request, Response } from "express";
import User from "../../models/User";

export async function createUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const isExist = await User.findOne({ username });

    if (isExist) {
      return res.status(400).json("User exist!");
    }
    const newUser = await User.create({ username, password });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json("Error");
  }
}
