import "./Header.css";
export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href="/">FlashCard</a>
        </div>
        <div>
          <a href="/">Decks</a>
        </div>
        <div>
          <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}
