import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalContext.jsx";
import '/public/style.css'; // Import the CSS file

export default function Nav() {
  const { login, isLoggedIn } = useContext(GlobalContext);
  return (
    <header className="nes-header">
      <nav className="nes-nav">
        <Link className="nes-link brand" to="/">NES TRADER</Link> |
        <Link className="nes-link" to="games">Games</Link> |
        {isLoggedIn ? (
          <>
            <Link className="nes-link" to="new-item">Sell</Link> |
            <Link className="nes-link" to="my-page">Username</Link> |
            <button className="nes-btn" onClick={login}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nes-link" to="login">Login/Register</Link>
            <button className="nes-btn" onClick={login}>Login</button>
          </>
        )}
      </nav>
    </header>
  );
}
