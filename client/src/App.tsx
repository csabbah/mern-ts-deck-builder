import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import { postDeck } from "./api/postDeck";

import "./App.css";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
};
export type user = {
  _id: string;
  username: string;
  email: string;
  decks: deck[];
};

import { getProfile } from "./utils/auth";

function App() {
  const [displayErr, setDisplayErr] = useState<boolean>(false);
  const [postErr, setPostErr] = useState<boolean>(false);

  const [user, setUser] = useState<user | null>(null);
  const [userId, setUserId] = useState<string>("");

  const localLoggedIn = localStorage.getItem("loggedIn");
  const loggedIn: boolean = localLoggedIn && JSON.parse(localLoggedIn);

  const [title, setTitle] = useState<string>("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title == "") {
      return setDisplayErr(true);
    }

    try {
      // Get the deck that was created
      const newUser: user = await postDeck(title, userId);
      // Update state array with the new deck
      setUser(newUser);

      // Clear form data
      setTitle("");
    } catch (err) {
      setPostErr(true);
      setTitle("");
    }
  };

  const handleDeleteDeck = async (deckId: string) => {
    const newUser: user = await deleteDeck(deckId, userId);
    setUser(newUser);
  };

  useEffect(() => {
    if (!loggedIn) return;

    // user id
    let { id } = getProfile();
    setUserId(id);

    async function fetchDecks() {
      const userData = await getDecks(id);
      setUser(userData);
    }
    fetchDecks();
  }, []);

  const resetState = (): void => {
    setDisplayErr(false);
    setPostErr(false);
  };

  return (
    <div className="container">
      <div className="App">
        {loggedIn && (
          <>
            <h1>Your Decks</h1>
            <ul className="decks">
              {user?.decks ? (
                user?.decks.map(
                  // Only render valid data (deck.title)
                  (deck) =>
                    deck.title && (
                      <Link key={deck._id} to={`decks/${deck._id}/${userId}`}>
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
                )
              ) : (
                <p style={{ color: "white" }}>Loading your decks...</p>
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
              style={{
                border: `1.5px solid ${displayErr && title == "" ? "red" : ""}`,
              }}
              id="deck-title"
              value={title}
              placeholder="Add Title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                resetState();
                setTitle(e.target.value);
              }}
            />
            {displayErr && title == "" && (
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
            <button>Create Deck</button>
            {postErr && (
              <p style={{ margin: "10px 0", marginTop: "0", color: "red" }}>
                Something went wrong, try again
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
