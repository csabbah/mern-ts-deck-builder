export async function updatePass(resetUrl: string, password: string) {
  const updatedUrl = resetUrl
    .replace(/encrypted24492024/g, ".") // Bring back the periods we removed
    .replace("5173", "3003") // If this doesn't exist, nothing happens
    .replace("csflashdeckcards.com", "api.csflashdeckcards.com");

  // NOTE - WHEN WE RUN THIS FETCH, THE LINK NEEDS TO BE THE API LINK
  // 5173 and csflashdeckcards are the front end hosts
  // switch from csflashdeckcards.com to api.csflashdeckcards.com

  const response = await fetch(`${updatedUrl}`, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
