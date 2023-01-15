export async function updatePass(resetUrl: string, password: string) {
  const response = await fetch(`${resetUrl}`, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
