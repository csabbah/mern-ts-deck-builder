import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import { loggedIn } from "./utils/auth";
import { updateCard } from "./api/updateCard";

export type card = {
  _id: string;
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
  const [hideControls, setHideControls] = useState<boolean>(false);

  const [editDeck, setEditDeck] = useState<EditDeckState>([null, null]);
  const [updatedText, setUpdatedText] = useState<string | null>(null);

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
  const [updateDisplayErr, setUpdateDisplayErr] = useState<boolean>(false);

  const [postErr, setPostErr] = useState<boolean>(false);

  const [deck, setDeck] = useState<deck | null>(null);
  const [text, setText] = useState<string>("");

  const { deckId } = useParams();
  const { userId } = useParams();

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text == "" || text.length > 150) {
      return setDisplayErr(true);
    }

    try {
      const updatedDeck: deck = await postCard(deckId!, selectedColor, text);
      setDeck(updatedDeck);

      // Clear form data
      setText("");
      // Revert to initial color choice
      setSelectedColor(colors[0]);
    } catch (err) {
      setPostErr(true);
      setText("");
    }
  };

  const handleUpdateCard = async (deckId: string, cardId: string) => {
    if (updatedText == "" || updatedText!.length > 150) {
      return setUpdateDisplayErr(true);
    }
    try {
      const updatedDeck: deck = await updateCard(
        updatedText!,
        selectedNewColor,
        deckId,
        cardId
      );

      setDeck(updatedDeck);

      // Clear form data
      setUpdatedText("");
      // Revert to initial color choice
      setSelectedNewColor(colors[0]);
      // And close off edit wrapper
      return setEditDeck([false, null]);
    } catch (err) {
      setUpdateDisplayErr(true);
      setUpdatedText("");
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
        <p style={{ marginTop: "25px", marginBottom: "0" }}>No Cards</p>
      )}
      <ul
        style={{
          gridTemplateColumns:
            deck && deck.cards.length == 1 ? "repeat(1, 1fr)" : "",
        }}
        className="cards"
      >
        {deck ? (
          deck.cards.map((card, index) => (
            <li
              className={`${card.bgColor ? card.bgColor : "default"} ${
                editDeck[0] && editDeck[1] == index && "active-edit-card"
              }`}
              key={index}
            >
              {editDeck[0] && editDeck[1] == index ? (
                <div className="edit-wrapper">
                  <textarea
                    style={{
                      border: updateDisplayErr ? "1.5px solid red" : "",
                    }}
                    onChange={(e) => {
                      setUpdateDisplayErr(false);
                      setUpdatedText(e.target.value);
                    }}
                    className="update-card"
                    defaultValue={card.title}
                  ></textarea>
                  <div style={{ marginTop: "5px" }} className="color-btns">
                    {colors.map((color, i) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedNewColor(color);
                          }}
                          key={i}
                          className={`${color} ${
                            selectedNewColor == color ? "active" : ""
                          }`}
                        ></button>
                      );
                    })}
                  </div>
                  {updateDisplayErr && (
                    <p
                      style={{
                        backgroundColor: "rgba(255,255,255, 0.8)",
                        color: "red",
                        marginTop: "10px",
                        marginBottom: "0",
                      }}
                    >
                      {updatedText == ""
                        ? "Missing data"
                        : updatedText!.length > 150
                        ? "Text must be under 150 characters"
                        : "Something went wrong, try again."}
                    </p>
                  )}
                  {!updateDisplayErr && (
                    <div style={{ backgroundColor: "rgba(255,255,255, 0.8)" }}>
                      {updatedText!.length > 140 &&
                        updatedText!.length <= 149 && (
                          <p
                            style={{
                              color: "green",
                              marginTop: "10px",
                              marginBottom: "0",
                            }}
                          >
                            Remaining letters: {10 - updatedText!.length + 140}
                          </p>
                        )}
                      {updatedText!.length >= 151 ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "10px",
                            marginBottom: "0",
                          }}
                        >
                          Over character count: {1 + updatedText!.length - 151}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  <div className="edit-controls">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateCard(deck._id, card._id);
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
                <div>
                  {!hideControls && (
                    <>
                      <div
                        className="delete-item"
                        onClick={() => handleDeleteCard(deck!._id, index)}
                      >
                        &times;
                      </div>
                      <div
                        className="edit-item"
                        onClick={(e) => {
                          setEditDeck([true, index]);
                          setUpdatedText(card.title);
                          e.preventDefault();
                        }}
                      >
                        Edit
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Loading your cards...</p>
        )}
      </ul>
      <button onClick={() => setHideControls(!hideControls)}>
        Hide Controls
      </button>
      {!hideControls && (
        <form onSubmit={handleCreateCard}>
          <label htmlFor="card-text">Card Text</label>
          <textarea
            style={{
              border: `1.5px solid ${displayErr ? "red" : "transparent"}`,
            }}
            id="card-text"
            value={text}
            placeholder="Add text"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              resetState();
              setText(e.target.value);
            }}
          />
          {displayErr && (
            <p
              style={{
                color: "red",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              {text == ""
                ? "Missing data"
                : text.length > 150
                ? "Text must be under 150 characters"
                : "Something went wrong, try again"}
            </p>
          )}
          {!displayErr && (
            <div>
              {text.length > 140 && text.length <= 149 && (
                <p
                  style={{
                    color: "green",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                >
                  Remaining letters: {10 - text.length + 140}
                </p>
              )}
              {text.length >= 151 ? (
                <p style={{ color: "red", marginTop: "0", marginBottom: "0" }}>
                  Over character count: {1 + text.length - 151}
                </p>
              ) : (
                ""
              )}
            </div>
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
      )}
    </div>
  );
}
