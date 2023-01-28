import { Request, Response } from "express";
import Deck from "../models/Deck";
import User from "../models/User";

export async function updateDeckController(req: Request, res: Response) {
  const title: string = req.body.title;
  const deckId: string = req.params.deckId;
  const bgColor: string = req.body.bgColor;
  const userId: string = req.params.userId;

  await Deck.findByIdAndUpdate(
    { _id: deckId },
    { $set: { title: title, bgColor: bgColor } },
    { new: true }
  );

  const user = await User.findById(userId).populate("decks");
  res.json(user);
}
