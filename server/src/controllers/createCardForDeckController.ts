import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId: string = req.params.deckId;
  const { text } = req.body;

  const updatedDeck = await Deck.findByIdAndUpdate(
    { _id: deckId },
    { $addToSet: { cards: text } },
    { new: true }
  );

  // Other method
  //   const deck = await Deck.findById(deckId);
  //   if (!deck) return res.status(400).send("NO deck with this id found");
  //   deck.cards.push(text);
  //   await deck.save();

  res.json(updatedDeck);
}
