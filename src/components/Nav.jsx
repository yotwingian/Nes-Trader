import { Link } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Nav() {
  const { isLoggedIn, login } = useContext(GlobalContext);

  return (
    <nav>
      <Link to="/">NES TRADER</Link> |
      <Link to="items">Games</Link> |
      {isLoggedIn ? (
        <>
          <Link to="my-page">Username</Link> |
          <Link to="new-item">Sell</Link> |
        </>
      ) : (
        <>
          <Link to="login">Login/Register</Link>
            <button style={{ marginLeft: '10px' }} onClick={login}>Login</button>  {/*tillf'llig styling*/}
        </>
      )}
    </nav>
  )
}
