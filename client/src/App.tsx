import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import { postDeck } from "./api/postDeck";
import { updateDeck } from "./api/updateDeck";

import "./App.css";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
  bgColor: string;
};
export type user = {
  _id: string;
  username: string;
  email: string;
  decks: deck[];
};

export type EditDeckState = [boolean | null, number | null];

import { getProfile } from "./utils/auth";

function App() {
  const [editDeck, setEditDeck] = useState<EditDeckState>([null, null]);
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);

  const colors: string[] = [
    "default",
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
    "pink",
  ];

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [selectedNewColor, setSelectedNewColor] = useState<string>(colors[0]);

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
      const newUser: user = await postDeck(title, selectedColor, userId);
      // Update state array with the new deck
      setUser(newUser);

      // Clear form data
      setTitle("");
      // Revert to initial color choice
      setSelectedColor(colors[0]);
    } catch (err) {
      setPostErr(true);
      setTitle("");
    }
  };

  const handleUpdateDeck = async (deckId: string) => {
    try {
      const updatedDeck: user = await updateDeck(
        updatedTitle!,
        selectedNewColor,
        deckId,
        userId
      );
      setUser(updatedDeck);

      // Clear form data
      setUpdatedTitle("");
      // Revert to initial color choice
      setSelectedNewColor(colors[0]);
    } catch (err) {
      setUpdatedTitle("");
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
      <div className="Card-wrapper">
        {loggedIn && (
          <>
            <h1>Your Decks</h1>
            {user?.decks.length == 0 && (
              <p style={{ margin: "auto" }}>No decks</p>
            )}
            <ul
              style={{
                gridTemplateColumns:
                  user?.decks.length == 1 ? "repeat(1, 1fr)" : "",
              }}
              className="cards"
            >
              {user?.decks ? (
                user?.decks.map(
                  // Only render valid data (deck.title)
                  (deck, i) =>
                    deck.title && (
                      <Link key={deck._id} to={`decks/${deck._id}/${userId}`}>
                        <li
                          onClick={(e) => {
                            editDeck[0] &&
                              editDeck[1] == i &&
                              e.preventDefault();
                          }}
                          className={`${
                            deck.bgColor ? deck.bgColor : "default"
                          } ${
                            editDeck[0] && editDeck[1] == i && "active-edit"
                          }`}
                        >
                          {editDeck[0] && editDeck[1] == i ? (
                            <div className="edit-wrapper">
                              <textarea
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                onChange={(e) =>
                                  setUpdatedTitle(e.target.value)
                                }
                                className="update-deck"
                                defaultValue={deck.title}
                              ></textarea>
                              <div
                                style={{ marginTop: "5px" }}
                                className="color-btns"
                              >
                                {colors.map((color, i) => {
                                  return (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedNewColor(color);
                                      }}
                                      key={i}
                                      className={`${color} ${
                                        selectedNewColor == color
                                          ? "active"
                                          : ""
                                      }`}
                                    ></button>
                                  );
                                })}
                              </div>
                              <div className="edit-controls">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateDeck(deck._id);
                                    return setEditDeck([false, null]);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    return setEditDeck([false, null]);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <span>{deck.title}</span>
                          )}
                          {editDeck[0] && editDeck[1] == i ? (
                            ""
                          ) : (
                            <div
                              className="delete-item"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteDeck(deck._id);
                              }}
                            >
                              &times;
                            </div>
                          )}
                          {editDeck[0] && editDeck[1] == i ? (
                            ""
                          ) : (
                            <div
                              className="edit-item"
                              onClick={(e) => {
                                setEditDeck([true, i]);
                                e.preventDefault();
                              }}
                            >
                              Edit
                            </div>
                          )}
                        </li>
                      </Link>
                    )
                )
              ) : (
                <p>Loading your decks...</p>
              )}
            </ul>
          </>
        )}
        {!loggedIn ? (
          <div className="login-to-view" style={{ margin: "0 auto" }}>
            <p>Login in to create and view your Decks</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "15px" }}
            >
              <Link to={`/login`}>Login</Link>
              <Link to={`/signup`}>Sign up</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateDeck}>
            <label htmlFor="deck-title">Deck Title</label>
            <input
              style={{
                border: `1.5px solid ${
                  displayErr && title == "" ? "red" : "transparent"
                }`,
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
            <div className="color-wrapper">
              <p>Choose card color</p>
              <div className="color-btns">
                {colors.map((color, i) => {
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedColor(color);
                      }}
                      key={i}
                      className={`${color} ${
                        selectedColor == color ? "active" : ""
                      }`}
                    ></button>
                  );
                })}
              </div>
            </div>
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
