import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    decks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deck",
      },
    ],
  }, // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
