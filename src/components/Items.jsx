import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx";

export default function Items() {


  const { items } = useContext(GlobalContext);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Game over!</span>
    } else {
      return <span>{days} days, {hours} hours, {minutes} minutes och {seconds} seconds Bid now!</span>;
    }

  }

  return (
    <>
      <h1>Games</h1>
      {
        items.map(item => <section key={item.id}>
          <Link to={{
            pathname: `/item-details/${item.id}`,
          }}>

            <img src={item.img} width="100" />
            <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Game ends in: <Countdown date={new Date(item.endDateTime)} renderer={renderer} /> </p>
          </Link>
        </section>)
      }

    </>
  )

}
