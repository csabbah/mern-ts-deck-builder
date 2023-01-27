import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  cards: [
    {
      title: { type: String },
      bgColor: { type: String },
    },
  ],
  bgColor: String,
});

const Deck = mongoose.model("Deck", DeckSchema);

export default Deck;
