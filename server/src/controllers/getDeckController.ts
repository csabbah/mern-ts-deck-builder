import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
  let deckId = req.params.deckId;

  const deck = await Deck.findById(deckId);
  res.json(deck);
}
