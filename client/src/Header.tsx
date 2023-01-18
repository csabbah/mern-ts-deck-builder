import "./Header.css";

export function Header({ loggedIn }: { loggedIn: boolean }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href="/">Decks</a>
        </div>
        <div>
          {loggedIn ? (
            <>
              <a href="/user-data">Account</a> -{" "}
              <a onClick={() => logout()}>Logout</a>
            </>
          ) : (
            <>
              <a href="/login">Login</a> - <a href="/signup">Sign up</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
