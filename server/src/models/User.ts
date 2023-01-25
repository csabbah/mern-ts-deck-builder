import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    decks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deck",
      },
    ],
    mobile: { type: Number },
  }, // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
