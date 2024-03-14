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
      <img src="../../img/test.png" alt="kontroll"></img>
      <Link to="/" style={{ textDecoration: 'none' }}>NES TRADER</Link>
      <Link to="games" style={{ textDecoration: 'none' }}>GAMES</Link>
      {isLoggedIn ? (
        <>
          <Link to="new-item" style={{ textDecoration: 'none' }}>NEW GAME</Link>
          <Link to="my-page" style={{ textDecoration: 'none' }}>{user.username}</Link>
          <button style={{ marginLeft: '10px' }} onClick={login} >RESET</button>  {/*tillfällig styling*/}
          <img src="../../img/test.png" alt="kontroll"></img>
        </>
      ) : (
        <>
          <button style={{ marginLeft: '10px' }} onClick={loginReg} >POWER</button>
          <img src="../../img/test.png" alt="kontroll"></img>
        </>
      )}
    </nav>
  )

}
