import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./App.css";

type deck = {
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<deck[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3003/decks", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Get the deck that was created
    const newDeck: deck = await response.json();
    // Update state array with the new deck
    setDecks([...decks, newDeck]);
    // Clear form data
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await fetch(`http://localhost:3003/deck/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:3003/decks");
      const newDecks = await response.json();
      setDecks(newDecks);

      // Promise method
      // const newDecks = await fetch("http://localhost:3003/decks").then(
      //   (response) => response.json()
      // );
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
