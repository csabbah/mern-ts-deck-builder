import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import { postDeck } from "./api/postDeck";

import "./App.css";

export type deck = {
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<deck[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the deck that was created
    const newDeck: deck = await postDeck(title);
    // Update state array with the new deck
    setDecks([...decks, newDeck]);
    // Clear form data
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks &&
          decks.map(
            // Only render valid data (deck.title)
            (deck) =>
              deck.title && (
                <Link key={deck._id} to={`decks/${deck._id}`}>
                  <li>
                    {deck.title}{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteDeck(deck._id);
                      }}
                    >
                      X
                    </button>
                  </li>
                </Link>
              )
          )}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          placeholder="Add Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
