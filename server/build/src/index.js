"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCardForDeckController_1 = require("./controllers/createCardForDeckController");
const createDeckController_1 = require("./controllers/createDeckController");
const deleteCardOnDeckController_1 = require("./controllers/deleteCardOnDeckController");
const deleteDeckController_1 = require("./controllers/deleteDeckController");
const getDeckController_1 = require("./controllers/getDeckController");
const getDecksController_1 = require("./controllers/getDecksController");
const app = (0, express_1.default)();
const cors = require("cors");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors({ origin: "*" }));
const PORT = 3003;
// app.get("/", (req: Request, res: Response) => {
//   res.setHeader("cookies", "hi");
//   console.log(res.getHeaders());
//   res.send("Hello World");
// });
app.get("/decks", getDecksController_1.getDecksController);
app.post("/decks", createDeckController_1.createDeckController);
app.delete("/decks/:deckId", deleteDeckController_1.deleteDeckController);
app.get("/decks/:deckId", getDeckController_1.getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController_1.createCardForDeckController);
app.delete("/decks/:deckId/cards/:cardIndex", deleteCardOnDeckController_1.deleteCardOnDeckController);
const db = require("../config/connection");
// Once DB is open, run the server
db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, function () {
        console.log(`Listening on port ${PORT}`);
    });
});
