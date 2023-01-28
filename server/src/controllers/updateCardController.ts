import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function updateCardController(req: Request, res: Response) {
  const deckId: string = req.params.deckId;
  const cardId: string = req.body.cardId;

  const newCard = { title: req.body.title, bgColor: req.body.bgColor };

  const deck = await Deck.findOneAndUpdate(
    { _id: deckId, cards: { $elemMatch: { _id: cardId } } },
    { $set: { "cards.$": newCard } },
    { new: true }
  );
  if (!deck) return res.json({ status: "No deck with this id" });

  res.json(deck);
}
