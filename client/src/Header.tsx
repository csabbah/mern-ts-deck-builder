import { Link } from "react-router-dom";

import { loggedIn, logout } from "./utils/auth";
export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <Link to={`/`}>Decks</Link>
        </div>
        <div>
          {loggedIn() ? (
            <>
              <Link to={`/user-data`}>Account</Link> /{" "}
              <a onClick={() => logout()}>Logout</a>
            </>
          ) : (
            <>
              <Link to={`/login`}>Login</Link> /{" "}
              <Link to={`/signup`}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
