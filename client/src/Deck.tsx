import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import { postDeck } from "./api/postDeck";
import { useParams } from "react-router-dom";

import "./App.css";
import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";

export type deck = {
  _id: string;
  cards: string[];
  title: string;
};

export default function Deck() {
  const [deck, setDeck] = useState<deck | undefined>(undefined);
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const { deckId } = useParams();

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedDeck: deck = await postCard(deckId!, text);
    setCards(updatedDeck.cards);

    // Clear form data
    setText("");
  };

  //   const handleDeleteDeck = async (deckId: string) => {
  //     await deleteDeck(deckId);
  //     setDecks(decks.filter((deck) => deck._id !== deckId));
  //   };

  useEffect(() => {
    // If deckId changes, re-run the useEffect
    async function fetchDecks() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId!);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDecks();
  }, [deckId]);

  return (
    <div className="App">
      {deck && deck.title}
      <ul className="decks">{cards && cards.map((card) => card)}</ul>
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
