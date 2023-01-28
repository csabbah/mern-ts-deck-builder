import { API_URL } from "../utils/config";

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
export async function getDeck(deckId: string, userId: string): Promise<deck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/${userId}`);
  return await response.json();

  // Promise method
  // const newDecks = await fetch("http://localhost:3003/decks").then(
  //   (response) => response.json()
  // );
}
