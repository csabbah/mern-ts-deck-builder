import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import { loggedIn } from "./utils/auth";

export type card = {
  title: string;
  bgColor: string;
};

export type deck = {
  _id: string;
  title: string;
  cards: card[];
};
export type EditDeckState = [boolean | null, number | null];

export default function Deck() {
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
      const updatedDeck: deck = await postCard(deckId!, selectedColor, text);
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
      {deck && deck.cards.length == 0 && (
        <p style={{ margin: "auto" }}>No Cards</p>
      )}
      <ul className="cards">
        {deck ? (
          deck.cards.map((card, index) => (
            <li
              style={{
                alignItems:
                  editDeck[0] && editDeck[1] == index ? "flex-end" : "",
              }}
              className={card.bgColor ? card.bgColor : "default"}
              key={index}
            >
              {editDeck[0] && editDeck[1] == index ? (
                <div className="edit-wrapper">
                  <textarea
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="update-deck"
                    defaultValue={deck.title}
                  ></textarea>
                  <div className="edit-controls">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
                <span>{card.title}</span>
              )}
              {editDeck[0] && editDeck[1] == index ? (
                ""
              ) : (
                <div
                  className="delete-item"
                  onClick={() => handleDeleteCard(deck!._id, index)}
                >
                  &times;
                </div>
              )}
              {editDeck[0] && editDeck[1] == index ? (
                ""
              ) : (
                <div
                  className="edit-item"
                  onClick={(e) => {
                    setEditDeck([true, index]);
                    e.preventDefault();
                  }}
                >
                  Edit
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Loading your cards...</p>
        )}
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
