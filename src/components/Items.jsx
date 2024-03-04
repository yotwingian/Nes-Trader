import React, { useContext } from "react"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx";

export default function Items() {


  const { items, filtered, setFiltered } = useContext(GlobalContext);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Game over!</span>
    } else {
      return <span>{days} days, {hours} hours, {minutes} minutes och {seconds} seconds Bid now!</span>;
    }

  }
  function filter(event) {
    const search_text = event.target.value
    const new_list = items.filter(item => item.title.toLowerCase().includes(search_text))
    setFiltered(new_list)
  }

  return (
    <>
      <search>
        <input type="text" onChange={filter} placeholder="Enter search here..." />
      </search>

      <h1>Games</h1>
      {
        filtered.map(item => <section key={item.id}>
          <img src={item.img} width="100" />
          <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Game ends in: <Countdown date={new Date(item.endDateTime)} renderer={renderer} /> </p>
        </section>)
      }

    </>
  )

}
