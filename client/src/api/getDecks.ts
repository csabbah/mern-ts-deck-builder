import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  title: string;
};

export async function getDecks(): Promise<deck[]> {
  const response = await fetch(`${API_URL}/decks`);
  return await response.json();

  // Promise method
  // const newDecks = await fetch("http://localhost:3003/decks").then(
  //   (response) => response.json()
  // );
}
