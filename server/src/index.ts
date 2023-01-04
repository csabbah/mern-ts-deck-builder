import express, { Express, Request, Response } from "express";
import { createCardForDeckController } from "./controllers/createCardForDeckController";

import { createDeckController } from "./controllers/createDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { getDecksController } from "./controllers/getDecksController";

const app: Express = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));
const PORT: number = 3003;

// app.get("/", (req: Request, res: Response) => {
//   res.setHeader("cookies", "hi");
//   console.log(res.getHeaders());

//   res.send("Hello World");
// });

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:cardIndex", deleteCardOnDeckController);

const db = require("../config/connection");

// Once DB is open, run the server
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
