import { Link } from "react-router-dom"

export default function Nav() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="login">Login/Register</Link>
      <Link to="my-page">Username</Link> {/*Ska ersätta Login med if-sats*/}
      {/* <Link to="Item">Game</Link> */}
      <Link to="new-item">Sell</Link>
    </nav>
  )

}
