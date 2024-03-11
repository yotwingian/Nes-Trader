import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Nav() {
  const { login, isLoggedIn } = useContext(GlobalContext)

  const handleLogout = () => {
    // Remove user information from local storage
    localStorage.removeItem("user");
    // Set isLoggedIn to false in your global context or state
    login(false)
    console.log(login);

  };
  return (
    <nav>
      <Link to="/">NES TRADER</Link> |
      <Link to="games">Games</Link> |
      {isLoggedIn ? (
        <>
          <Link to="new-item">Sell</Link> |
          <Link to="my-page">Username</Link> |
          <button style={{ marginLeft: '10px' }} onClick={handleLogout} >Logout</button>  {/*tillfällig styling*/}
        </>
      ) : (
        <>
          <Link to="login">Login/Register</Link>

        </>
      )}
    </nav>
  )

}
