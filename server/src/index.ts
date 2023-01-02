import express, { Express, Request, Response } from "express";
import { Model, Models } from "mongoose";
import Deck from "./models/Deck";

const app: Express = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));
const PORT: number = 3003;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("cookies", "hi");
  console.log(res.getHeaders());

  res.send("Hello World");
});

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find({});

  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const title: string = req.body.title;

  // 2 Ways to create a model:
  // First method
  //   const newDeck = new Deck({ title: "My awesome deck" });
  //   const createdDeck = await newDeck.save(); // Save it to the DB

  // Second method
  const newDeck = await Deck.create({ title });

  res.json(newDeck);
});

// app.get("/deck/:id", (req: Request, res: Response) => {
//   let param = req.params.id;

//   const deleteDeck = Deck.findByIdAndDelete({ param });
//   console.log(deleteDeck);

//   res.json(`${deleteDeck} was deleted`);
// });

app.delete("/deck/:id", async (req: Request, res: Response) => {
  let deckId = req.params.id;

  const deleteDeck = await Deck.findByIdAndDelete(deckId);

  console.log(deckId, deleteDeck);
  res.json(`${deleteDeck} was deleted`);
});

const db = require("../config/connection");

// Once DB is open, run the server
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
