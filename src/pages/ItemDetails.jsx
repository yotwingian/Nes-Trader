import React, { useContext } from "react"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx";

import { useParams } from "react-router-dom";


export default function ItemDetails() {
  const { items } = useContext(GlobalContext);
  const { id } = useParams();


  const item = items[id - 1]

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Game over!</span>
    } else {
      return <span>{days} days, {hours} hours, {minutes} minutes och {seconds} seconds Bid now!</span>;
    }

  }

  return (
    <>
      <h1>ItemDetails</h1>
      <img src={item.img} width="100" />
      <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Game ends in: <Countdown date={new Date(item.endDateTime)} renderer={renderer} /> </p>
    </>
  )
}



