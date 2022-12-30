import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3003;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/:id", (req: Request, res: Response) => {
  let param = req.params.id;

  res.send(`Endpoint param =${param}`);
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
