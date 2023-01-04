import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {
  const deckId: string = req.params.deckId;
  const cardIndex: string = req.params.cardIndex;

  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("No deck of this id exists");
  deck.cards.splice(parseInt(cardIndex), 1);
  await deck.save();
  res.json(deck);
}
