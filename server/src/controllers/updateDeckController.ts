// import { Request, Response } from "express";
// import Deck from "../models/Deck";

// export async function createDeckController(req: Request, res: Response) {
//   const title: string = req.body.title;
//   const deckId: string = req.body.deckId;

//   const updateUserArr = await Deck.updateOne(
//     { _id: deckId },
//     { $set: { title: title } },
//     { new: true }
//   );

//   res.json(updateUserArr);
// }
