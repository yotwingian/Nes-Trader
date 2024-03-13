import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Nav() {
  const { login, isLoggedIn } = useContext(GlobalContext)
  const {user} = useContext(GlobalContext)

  return (
    <nav>
      <img src="../../img/test.png" alt="kontroll"></img>
      <Link to="/" style={{ textDecoration: 'none' }}>NES TRADER</Link>
      <Link to="games" style={{ textDecoration: 'none' }}>Games</Link>
      {isLoggedIn ? (
        <>
          <Link to="new-item" style={{ textDecoration: 'none' }}>Sell</Link>
          <Link to="my-page" style={{ textDecoration: 'none' }}>{user.username}</Link>
          <button style={{ marginLeft: '10px' }} onClick={login} >Logout</button>  {/*tillfällig styling*/}
        </>
      ) : (
        <>
            <Link to="login" style={{ textDecoration: 'none' }}>Login/Register</Link>
                 </>
      )}
    </nav>
  )

}
