import decode from "jwt-decode";

export type user = {
  id: string;
  email: string;
};

export const getProfile = (): user => {
  let userToken: string | null = localStorage.getItem("token");

  return decode(userToken!);
};

export const loggedIn = (): boolean => {
  const localLoggedIn = localStorage.getItem("loggedIn");
  const loggedIn: boolean = localLoggedIn && JSON.parse(localLoggedIn);

  if (loggedIn) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "./login";
};
