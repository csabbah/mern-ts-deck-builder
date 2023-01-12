import "./Header.css";
export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href="/">Decks</a>
        </div>
        <div>
          <a href="/login">Login</a> - <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}
