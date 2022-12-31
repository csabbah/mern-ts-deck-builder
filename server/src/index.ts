import express, { Request, Response } from "express";
import Deck from "./models/Deck";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT: number = 3003;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("cookies", "hi");
  console.log(res.getHeaders());

  res.send("Hello World");
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

app.get("/:id", (req: Request, res: Response) => {
  let param = req.params.id;
  res.send(`Endpoint param =${param}`);
});

const db = require("../config/connection");

// Once DB is open, run the server
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
