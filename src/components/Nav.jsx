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
      <img src="../../img/controller.png" alt="controller"></img>
      <Link to="/" style={{ textDecoration: 'none' }}>NES TRADER</Link>
      <Link to="games" style={{ textDecoration: 'none' }}>GAMES</Link>
      {isLoggedIn ? (
        <>
          <Link to="new-item" style={{ textDecoration: 'none' }}>NEW GAME</Link>
          <Link to="my-page" style={{ textDecoration: 'none' }}>{user.userName}</Link>
          <button onClick={login} >RESET</button>
        </>
      ) : (
        <>
          <button onClick={loginReg} >POWER</button>
        </>
      )}
    </nav>
  )

}
