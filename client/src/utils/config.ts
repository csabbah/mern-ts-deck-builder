const dev = process.env.NODE_ENV !== "production";

export const API_URL = dev
  ? "http://localhost:3003"
  : "https://mern-ts-deck-builder.vercel.app/";
