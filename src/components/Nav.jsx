import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Nav() {
  const { login, isLoggedIn } = useContext(GlobalContext)
  return (
    <nav>
      <Link to="/">NES TRADER</Link> |
      <Link to="games">Games</Link> |
      {isLoggedIn ? (
        <>
          <Link to="new-item">Sell</Link> |
          <Link to="my-page">Username</Link> |
          <button style={{ marginLeft: '10px' }} onClick={login} >Logout</button>  {/*tillfällig styling*/}
        </>
      ) : (
        <>
          <Link to="login">Login/Register</Link>
          <button style={{ marginLeft: '10px' }} onClick={login} >Login</button>  {/*tillfällig styling*/}
        </>
      )}
    </nav>
  )

}


