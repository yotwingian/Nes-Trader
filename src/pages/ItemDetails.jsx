import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Countdown from "react-countdown"
import BidForm from "../components/AddBid.jsx"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"


export default function ItemDetails() {

  const { id } = useParams()
  const [item, setItem] = useState()

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items/" + id)
      const data = await response.json()
      setItem(data)
    }
    load()
  }, [])

  if (!item) {
    return null
  }
  
  return <>
    <BidForm itemId={parseInt(id)} />
    <h1>{item.title}</h1>
    <img src={item.img} width="300" alt={item.title} />
    <p>
      {item.releaseYear} | {item.genre} | <MaxBid id={parseInt(id)} startPrice={parseInt(item.startPrice)} /> | <TotalBids id={parseInt(id)} /> | 
      Game over in: <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} /> 
    </p>
    <p>{item.description}</p>
  </>
}