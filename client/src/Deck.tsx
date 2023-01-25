import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import { loggedIn } from "./utils/auth";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
};

export default function Deck() {
  const [displayErr, setDisplayErr] = useState<boolean>(false);
  const [postErr, setPostErr] = useState<boolean>(false);

  const [deck, setDeck] = useState<deck | null>(null);
  const [text, setText] = useState<string>("");

  const { deckId } = useParams();
  const { userId } = useParams();

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text == "") {
      return setDisplayErr(true);
    }

    try {
      const updatedDeck: deck = await postCard(deckId!, text);
      setDeck(updatedDeck);

      // Clear form data
      setText("");
    } catch (err) {
      setText("");
    }
  };

  const handleDeleteCard = async (deckId: string, cardIndex: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, cardIndex);
    setDeck(newDeck);
  };

  useEffect(() => {
    // If deckId changes, re-run the useEffect
    async function fetchDecks() {
      if (!deckId || !userId) return;
      const deck: deck = await getDeck(deckId!, userId!);
      setDeck(deck);
    }
    fetchDecks();
  }, [deckId]);

  const resetState = (): void => {
    setDisplayErr(false);
    setPostErr(false);
  };

  useEffect(() => {
    if (!loggedIn()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="Card-wrapper">
      <h1>{deck && deck.title}</h1>
      <ul className="cards">
        {deck &&
          deck.cards.map((card, index) => (
            <li key={index}>
              {card}
              <span
                className="delete-item"
                onClick={() => handleDeleteCard(deck!._id, index)}
              >
                &times;
              </span>
            </li>
          ))}
      </ul>

      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input
          style={{
            border: `1.5px solid ${
              displayErr && text == "" ? "red" : "transparent"
            }`,
          }}
          id="card-text"
          value={text}
          placeholder="Add text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            resetState();
            setText(e.target.value);
          }}
        />
        {displayErr && text == "" && (
          <p
            style={{
              color: "red",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Missing data
          </p>
        )}
        <button>Create Card</button>
        {postErr && (
          <p style={{ margin: "10px 0", marginTop: "0", color: "red" }}>
            Something went wrong, try again
          </p>
        )}
      </form>
    </div>
  );
}
