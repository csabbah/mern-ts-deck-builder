import { Request, Response } from "express";
import User from "../models/User";
export async function getDecksController(req: Request, res: Response) {
  let userId: string = req.params.userId;
  let userData = await User.findOne({ _id: userId }).populate("decks");

  res.json(userData);
}
