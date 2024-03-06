import { useContext } from "react"
import { useParams } from "react-router-dom"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx"
import CountdownRenderer from "../components/CountdownRenderer.jsx"

export default function ItemDetails() {

  const { items } = useContext(GlobalContext)
  const { id } = useParams()

  // const item = items[id - 1]
  const item = items.find(item => item.id.toString() === id)

  return (
    <>
      <h1>ItemDetails</h1>
      <img src={item.img} width="300" />
      <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Game ends in: <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} /></p>
    </>
  )

}
