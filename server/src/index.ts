import express, { Request, Response } from "express";
import Deck from "./models/Deck";

const app = express();
const PORT: number = 3003;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("cookies", "hi");
  console.log(res.getHeaders());

  res.send("Hello World");
});

app.get("/:id", (req: Request, res: Response) => {
  let param = req.params.id;
  res.send(`Endpoint param =${param}`);
});

const db = require("../config/connection");

// Once DB is open, run the server
db.once("open", () => {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
