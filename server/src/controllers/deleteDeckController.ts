import { Request, Response } from "express";
import Deck from "../models/Deck";
import User from "../models/User";

export async function deleteDeckController(req: Request, res: Response) {
  let deckId = req.params.deckId;
  let userId = req.params.userId;

  await Deck.findByIdAndDelete(deckId);

  const updateUserArr = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { decks: deckId } },
    { new: true }
  ).populate("decks");

  res.json(updateUserArr);
}
