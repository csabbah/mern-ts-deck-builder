import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  cards: string[];
  title: string;
};

export async function getDeck(deckId: string): Promise<deck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();

  // Promise method
  // const newDecks = await fetch("http://localhost:3003/decks").then(
  //   (response) => response.json()
  // );
}
