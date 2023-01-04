import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
  const title: string = req.body.title;

  // 2 Ways to create a model:
  // First method
  //   const newDeck = new Deck({ title: "My awesome deck" });
  //   const createdDeck = await newDeck.save(); // Save it to the DB

  // Second method
  const newDeck = await Deck.create({ title });

  res.json(newDeck);
}
