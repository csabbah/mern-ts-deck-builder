import { Request, Response } from "express";

import User from "../models/User";

export async function getDeckController(req: Request, res: Response) {
  let deckId: string = req.params.deckId;
  let userId: string = req.params.userId;

  let user = await User.findOne({ _id: userId }).populate("decks");
  user?.decks.forEach((deck) => {
    if (deck._id.toString() == deckId) {
      return res.json(deck);
    }
  });
}
