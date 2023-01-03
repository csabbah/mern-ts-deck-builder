import { API_URL } from "../utils/config";

export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/deck/${deckId}`, {
    method: "DELETE",
  });
}
