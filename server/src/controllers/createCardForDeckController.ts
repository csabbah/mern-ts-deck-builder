import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId: string = req.params.deckId;

  const card = { title: req.body.title, bgColor: req.body.bgColor };

  const updatedDeck = await Deck.findByIdAndUpdate(
    { _id: deckId },
    { $addToSet: { cards: card } },
    { new: true }
  );

  // Other method
  //   const deck = await Deck.findById(deckId);
  //   if (!deck) return res.status(400).send("NO deck with this id found");
  //   deck.cards.push(text);
  //   await deck.save();

  res.json(updatedDeck);
}
