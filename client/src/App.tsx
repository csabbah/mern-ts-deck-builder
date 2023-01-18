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
  const localLoggedIn = localStorage.getItem("loggedIn");
  const loggedIn: boolean = localLoggedIn && JSON.parse(localLoggedIn);

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
    <div className="container">
      <div className="App">
        {loggedIn && (
          <>
            <h1>Your Decks</h1>
            <ul className="decks">
              {decks &&
                decks.map(
                  // Only render valid data (deck.title)
                  (deck) =>
                    deck.title && (
                      <Link key={deck._id} to={`decks/${deck._id}`}>
                        <li>
                          {deck.title}{" "}
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteDeck(deck._id);
                            }}
                          >
                            X
                          </span>
                        </li>
                      </Link>
                    )
                )}
            </ul>
          </>
        )}
        {!loggedIn ? (
          <div style={{ margin: "0 auto" }}>
            <p>Login in to create and view your Decks</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "15px" }}
            >
              <a href="/login">Login</a> <a href="/signup">Sign up</a>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default App;
