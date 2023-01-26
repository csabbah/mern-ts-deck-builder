import { Request, Response } from "express";
import Deck from "../models/Deck";
import User from "../models/User";

export async function createDeckController(req: Request, res: Response) {
  const title: string = req.body.title;
  const userId: string = req.body.id;
  const bgColor: string = req.body.bgColor;

  // 2 Ways to create a model:
  // First method
  //   const newDeck = new Deck({ title: "My awesome deck" });
  //   const createdDeck = await newDeck.save(); // Save it to the DB

  // Second method
  const newDeck = await Deck.create({ title, bgColor });

  const updateUserArr = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { decks: newDeck } },
    { new: true }
  ).populate("decks");

  res.json(updateUserArr);
}
