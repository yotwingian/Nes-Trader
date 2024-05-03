import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Nav() {
  const { login, isLoggedIn } = useContext(GlobalContext)
  const { user } = useContext(GlobalContext)
  const navigate = useNavigate()

  function loginReg() {
    navigate("/login")
  }

  return (
    <nav>
      <img src="../../img/controller.png" />
      <Link id="home" to="/" style={{ textDecoration: 'none' }}>NES TRADER</Link>
      <Link id="games" to="games" style={{ textDecoration: 'none' }}>GAMES</Link>
      {isLoggedIn ? (
        <>
          <Link id="new-item" to="new-item" style={{ textDecoration: 'none' }}>NEW GAME</Link>
          <Link id="my-page" to="my-page" style={{ textDecoration: 'none' }}>{user}</Link>
          <button id="logout" onClick={login} >RESET</button>
        </>
      ) : (
        <>
          <button id="login" onClick={loginReg} >POWER</button>
        </>
      )}
    </nav>
  )

}
