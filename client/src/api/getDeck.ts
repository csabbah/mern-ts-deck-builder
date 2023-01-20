import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
};

export async function getDeck(deckId: string, userId: string): Promise<deck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/${userId}`);
  return await response.json();

  // Promise method
  // const newDecks = await fetch("http://localhost:3003/decks").then(
  //   (response) => response.json()
  // );
}
