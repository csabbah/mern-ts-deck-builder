import { Request, Response } from "express";
import Deck from "../models/Deck";
import User from "../models/User";
export async function getDecksController(req: Request, res: Response) {
  const userId: string = req.params.userId;
  const userData = await User.findOne({ _id: userId }).populate("decks");
  // const decks = await Deck.find({});

  res.json(userData);
}
