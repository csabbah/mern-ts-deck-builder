import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
  let deckId = req.params.deckId;

  const deleteDeck = await Deck.findByIdAndDelete(deckId);

  res.json(`${deleteDeck} was deleted`);
}
