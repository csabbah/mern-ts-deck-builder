import { API_URL } from "../utils/config";

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

export async function getDecks(userId: string): Promise<user> {
  const response = await fetch(`${API_URL}/decks/${userId}`);
  return response.json();

  // Promise method
  // const newDecks = await fetch("http://localhost:3003/decks").then(
  //   (response) => response.json()
  // );
}
