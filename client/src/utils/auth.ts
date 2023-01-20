import decode from "jwt-decode";

export type user = {
  id: string;
  email: string;
};

export const getProfile = (): user => {
  let userToken: string | null = localStorage.getItem("token");

  return decode(userToken!);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "./login";
};
