import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { postCard } from "./api/postCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import { loggedIn } from "./utils/auth";
import { updateCard } from "./api/updateCard";

import "./FlipCard.css";
export type card = {
  _id: string;
  title: string;
  text: string;
  bgColor: string;
};

export type deck = {
  _id: string;
  title: string;
  cards: card[];
};
export type EditDeckState = [boolean | null, number | null];

export default function Deck() {
  const [flipCard, setFlipCard] = useState<EditDeckState>([null, null]);
  const [hideControls, setHideControls] = useState<boolean>(false);

  const [editDeck, setEditDeck] = useState<EditDeckState>([null, null]);
  const [updatedText, setUpdatedText] = useState<string | null>(null);
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
  const [updateDisplayErr, setUpdateDisplayErr] = useState<boolean>(false);

  const [postErr, setPostErr] = useState<boolean>(false);

  const [deck, setDeck] = useState<deck | null>(null);
  const [shuffledCards, setShuffledCards] = useState<card[] | null>(null);

  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { deckId } = useParams();
  const { userId } = useParams();

  const postCardText = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title == "" || text.length > 150 || title.length > 50) {
      return setDisplayErr(true);
    }

    try {
      const updatedDeck: deck = await postCard(
        deckId!,
        selectedColor,
        title,
        text
      );
      setDeck(updatedDeck);

      // Clear form data
      setText("");
      setTitle("");
      // Revert to initial color choice
      setSelectedColor(colors[0]);
    } catch (err) {
      setPostErr(true);
      setText("");
      setTitle("");
    }
  };

  const [singleView, setSingleView] = useState<boolean>(false);
  const [singleIndex, setSingleIndex] = useState<number>(0);
  const [flipSingleCard, setFlipSingleCard] = useState<boolean>(false);

  function shuffleArray(array: card[]) {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleUpdateCard = async (deckId: string, cardId: string) => {
    if (
      updatedTitle == "" ||
      updatedTitle!.length > 50 ||
      updatedText!.length > 150
    ) {
      return setUpdateDisplayErr(true);
    }
    try {
      const updatedDeck: deck = await updateCard(
        updatedTitle!,
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
      <div className={`flip-card-wrapper`}>
        {shuffledCards && singleView && (
          <div>
            <p>
              Card: {singleIndex + 1} of {shuffledCards.length}
            </p>
            <li className={`flip-card single ${flipSingleCard && "flip"}`}>
              <div className={`flip-card-inner`}>
                <div
                  className={`flip-card-front ${
                    shuffledCards[singleIndex].bgColor
                      ? shuffledCards[singleIndex].bgColor
                      : "default"
                  }`}
                >
                  {editDeck[0] ? (
                    ""
                  ) : (
                    <div
                      style={{
                        transition: flipSingleCard
                          ? ""
                          : // add a 0.3s delay before the original controls show up (after you flip back)
                            "0.5s opacity 0.3s",
                        opacity: flipSingleCard ? "0" : "1",
                        pointerEvents: flipSingleCard ? "none" : "all",
                      }}
                    >
                      {shuffledCards[singleIndex].text && (
                        <div
                          className="flip-item"
                          onClick={(e) => {
                            setFlipSingleCard(!flipSingleCard);
                            e.preventDefault();
                          }}
                        >
                          <img src="/images/flip.png" alt="image" />
                        </div>
                      )}
                    </div>
                  )}
                  <span>
                    {shuffledCards[singleIndex].title &&
                      shuffledCards[singleIndex].title}
                  </span>
                </div>
                <div
                  className={`flip-card-back ${
                    shuffledCards[singleIndex].bgColor
                      ? shuffledCards[singleIndex].bgColor
                      : "default"
                  } dark`}
                >
                  <span>
                    {shuffledCards[singleIndex].text &&
                      shuffledCards[singleIndex].text}
                  </span>
                  <div
                    className="flip-item"
                    onClick={(e) => {
                      setFlipSingleCard(!flipSingleCard);
                      e.preventDefault();
                    }}
                  >
                    <img src="/images/flip.png" alt="image" />
                  </div>
                </div>
              </div>
            </li>
          </div>
        )}

        {deck &&
          !singleView &&
          deck.cards.map((card, index) => (
            <li
              className={`flip-card ${
                editDeck[0] && editDeck[1] == index && "active-edit-card"
              } ${flipCard[0] && flipCard[1] == index && "flip"}`}
              key={index}
            >
              {editDeck[0] && editDeck[1] == index ? (
                <div className="edit-wrapper">
                  <textarea
                    style={{
                      border:
                        (updateDisplayErr && updatedTitle!.length > 50) ||
                        updatedTitle == ""
                          ? "1.5px solid red"
                          : "",
                    }}
                    onChange={(e) => {
                      setUpdateDisplayErr(false);
                      setUpdatedTitle(e.target.value);
                    }}
                    className="update-card title"
                    defaultValue={card.title}
                  ></textarea>
                  {!updateDisplayErr && updatedTitle && (
                    <div style={{ backgroundColor: "rgba(255,255,255, 0.8)" }}>
                      {updatedTitle!.length > 40 &&
                        updatedTitle!.length <= 49 && (
                          <p
                            style={{
                              color: "green",
                              marginTop: "10px",
                              marginBottom: "0",
                            }}
                          >
                            Remaining letters: {10 - updatedTitle!.length + 40}
                          </p>
                        )}
                      {updatedTitle!.length >= 51 ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "10px",
                            marginBottom: "0",
                          }}
                        >
                          Over character count: {1 + updatedTitle!.length - 51}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  <textarea
                    style={{
                      border:
                        updateDisplayErr && updatedText!.length > 150
                          ? "1.5px solid red"
                          : "",
                    }}
                    onChange={(e) => {
                      setUpdateDisplayErr(false);
                      setUpdatedText(e.target.value);
                    }}
                    className="update-card text"
                    defaultValue={card.text}
                  ></textarea>
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
                  <div style={{ marginTop: "13px" }} className="color-btns">
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
                <div className={`flip-card-inner `}>
                  <div
                    className={`flip-card-front ${
                      card.bgColor ? card.bgColor : "default"
                    }`}
                  >
                    {editDeck[0] && editDeck[1] == index ? (
                      ""
                    ) : (
                      <div
                        style={{
                          transition:
                            flipCard[0] && flipCard[1] == index
                              ? ""
                              : // add a 0.3s delay before the original controls show up (after you flip back)
                                "0.5s opacity 0.3s",
                          opacity:
                            flipCard[0] && flipCard[1] == index ? "0" : "1",
                          pointerEvents:
                            flipCard[0] && flipCard[1] == index
                              ? "none"
                              : "all",
                        }}
                      >
                        {!hideControls && (
                          <div>
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
                                setUpdatedTitle(card.title);
                                setUpdatedText(card.text);
                                e.preventDefault();
                              }}
                            >
                              Edit
                            </div>
                          </div>
                        )}
                        {card.text && (
                          <div
                            className="flip-item"
                            onClick={(e) => {
                              setFlipCard([true, index]);
                              e.preventDefault();
                            }}
                          >
                            <img src="/images/flip.png" alt="image" />
                          </div>
                        )}
                      </div>
                    )}
                    <span>{card.title && card.title}</span>
                  </div>
                  <div
                    className={`flip-card-back ${
                      card.bgColor ? card.bgColor : "default"
                    } dark`}
                  >
                    <span>{card.text && card.text}</span>
                    <div
                      className="flip-item"
                      onClick={(e) => {
                        setFlipCard([null, null]);
                        e.preventDefault();
                      }}
                    >
                      <img src="/images/flip.png" alt="image" />
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        {deck ? "" : <p>Loading your cards...</p>}
      </div>
      <div style={{ display: "flex", gap: "10px", margin: "30px 0" }}>
        {shuffledCards && shuffledCards.length < 2 ? (
          ""
        ) : singleView ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                let flipped = flipSingleCard ? 550 : 0;

                setFlipSingleCard(false);
                setTimeout(() => {
                  if (shuffledCards) {
                    setSingleIndex(
                      singleIndex !== 0
                        ? singleIndex - 1
                        : shuffledCards.length - 1
                    );
                  }
                }, flipped);
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                // Checked if flipped, if so, add a timeout so it gives time for
                // card to flip back before proceeding to the next card
                let flipped = flipSingleCard ? 550 : 0;

                setFlipSingleCard(false);
                setTimeout(() => {
                  if (shuffledCards) {
                    setSingleIndex(
                      singleIndex !== shuffledCards.length - 1
                        ? singleIndex + 1
                        : 0
                    );
                  }
                }, flipped);
              }}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}

        {deck && deck.cards.length > 0 && (
          <button
            onClick={() => {
              setSingleIndex(0);
              setFlipCard([null, null]);
              setFlipSingleCard(false);

              if (singleView) {
                setSingleView(false);
                return setHideControls(false);
              }
              setShuffledCards(shuffleArray(deck!.cards));
              setSingleView(true);
              setHideControls(true);
            }}
          >
            View {singleView ? "All" : "Single"} Cards
          </button>
        )}
        {!singleView && (
          <button onClick={() => setHideControls(!hideControls)}>
            Hide Controls
          </button>
        )}
      </div>
      {!hideControls && (
        <div>
          <form onSubmit={postCardText}>
            <label htmlFor="card-Title">Front of Card</label>
            <input
              style={{
                border:
                  displayErr && (title.length > 50 || title == "")
                    ? `1.5px solid red`
                    : "",
              }}
              id="card-Title"
              value={title}
              placeholder="Add Title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                resetState();
                setTitle(e.target.value);
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
                {title == ""
                  ? "Missing data"
                  : title.length > 50
                  ? "Title must be under 50 characters"
                  : ""}
              </p>
            )}
            {!displayErr && (
              <div>
                {title.length > 40 && title.length <= 49 && (
                  <p
                    style={{
                      color: "green",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    Remaining letters: {10 - title.length + 40}
                  </p>
                )}
                {title.length >= 51 ? (
                  <p
                    style={{ color: "red", marginTop: "0", marginBottom: "0" }}
                  >
                    Over character count: {1 + title.length - 51}
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
            <hr style={{ opacity: "0.2", width: "100%" }}></hr>
            <label htmlFor="card-text">Back of Card (Optional Field)</label>
            <textarea
              style={{
                border: `1.5px solid ${
                  text.length > 150 ? "red" : "transparent"
                }`,
              }}
              id="card-text"
              value={text}
              placeholder="Add text"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                resetState();
                setText(e.target.value);
              }}
            />
            {displayErr && text.length > 150 && (
              <p
                style={{
                  color: "red",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                Text must be under 150 characters
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
                  <p
                    style={{ color: "red", marginTop: "0", marginBottom: "0" }}
                  >
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
        </div>
      )}
    </div>
  );
}
