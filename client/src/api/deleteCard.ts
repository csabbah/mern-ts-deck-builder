import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  cards: string[];
  title: string;
};

export async function deleteCard(
  deckId: string,
  cardIndex: number
): Promise<deck> {
  const response = await fetch(
    `${API_URL}/decks/${deckId}/cards/${cardIndex}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
