import { Link } from "react-router-dom"

export default function Nav() {

  return (
    <nav>
      <Link to="/">Home</Link> |&nbsp;
      <Link to="login">Login/Register</Link> |&nbsp;
      <Link to="my-page">Username</Link> |&nbsp; {/*Ska ersätta Login med if-sats*/}
      <Link to="new-item">Sell</Link> |&nbsp; {/*Ska bara synas som inloggad*/}
      <Link to="items">Items</Link> {/*Ska bara synas som inloggad*/}
    </nav>
  )

}
