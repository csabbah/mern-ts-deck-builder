import React, { useState, useEffect } from "react";
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

    await fetch("http://localhost:3003/decks", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
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
            (deck) => deck.title && <li key={deck._id}>{deck.title}</li>
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
