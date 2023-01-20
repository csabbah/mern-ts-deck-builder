import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Deck.css";

import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
};

export default function Deck() {
  const [deck, setDeck] = useState<deck | undefined>(undefined);
  const [text, setText] = useState<string>("");

  const { deckId } = useParams();
  const { userId } = useParams();

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedDeck: deck = await postCard(deckId!, text);
    setDeck(updatedDeck);

    // Clear form data
    setText("");
  };

  const handleDeleteCard = async (deckId: string, cardIndex: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, cardIndex);
    setDeck(newDeck);
  };

  useEffect(() => {
    // If deckId changes, re-run the useEffect
    async function fetchDecks() {
      if (!deckId && !userId) return;
      const deck: deck = await getDeck(deckId!, userId!);
      setDeck(deck);
    }
    fetchDecks();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck && deck.title}</h1>
      <ul className="cards">
        {deck &&
          deck.cards.map((card, index) => (
            <li key={index}>
              {card}
              <span onClick={() => handleDeleteCard(deck! && deck._id, index)}>
                X
              </span>
            </li>
          ))}
      </ul>

      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input
          id="card-text"
          value={text}
          placeholder="Add text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
