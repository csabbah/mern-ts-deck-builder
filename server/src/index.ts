import express, { Express } from "express";
require("dotenv").config();
import path from "path";
import { createCardForDeckController } from "./controllers/createCardForDeckController";

import { createDeckController } from "./controllers/createDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { getDecksController } from "./controllers/getDecksController";

import { createUser } from "./controllers/userController/createUser";
import { forgotPassword } from "./controllers/userController/forgotPassword";
import { loginUser } from "./controllers/userController/loginUser";
import { updatePassword } from "./controllers/userController/updatePassword";
import { userData } from "./controllers/userController/userData";

const app: Express = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));
const PORT: number = 3003;

app.get("/decks/:userId", getDecksController);
app.post("/decks", createDeckController);

app.post("/user-data", userData);
app.post("/user", createUser);
app.post("/login-user", loginUser);

app.post("/forgot-password", forgotPassword);
app.post("/reset-password/:id/:token", updatePassword);

app.delete("/decks/:deckId/:userId", deleteDeckController);
app.get("/decks/:deckId/:userId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:cardIndex", deleteCardOnDeckController);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

const db = require("./config/connection");

// Once DB is open, run the server
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
