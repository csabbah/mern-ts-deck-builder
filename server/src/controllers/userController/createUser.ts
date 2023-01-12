import { Request, Response } from "express";
import User from "../../models/User";

export async function createUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const newUser = await User.create({ username, password });

  res.json(newUser);
}
