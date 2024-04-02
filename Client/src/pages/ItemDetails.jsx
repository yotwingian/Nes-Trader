import { useState, useEffect, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx"
import BidForm from "../components/AddBid.jsx"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"
import CurrentBid from "../components/CurrentBid.jsx"

export default function ItemDetails() {

  const { id } = useParams()
  const [item, setItem] = useState()
  const { isLoggedIn } = useContext(GlobalContext)
  const navigate = useNavigate()

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

  function loginReg() {
    navigate("/login")
  }

  function bid() {
    if (isLoggedIn) {
      return <BidForm itemId={parseInt(id)} startPrice={parseInt(item.startPrice)} />
    }
    else {
      return <>
        <button onClick={loginReg} >POWER</button>
        <span className="bid-text"> to place a bid!
        </span>
      </>
    }
  }

  return <>

    <div className="item-container">
      <div className="details-container">
        <h1>{item.title}</h1>
        <img src={item.img} width="300" alt={item.title} />
        <p>
          {item.releaseYear} | {item.genre} | <MaxBid id={parseInt(id)} startPrice={parseInt(item.startPrice)} /> | <TotalBids id={parseInt(id)} /> <br />
          <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />
        </p>
        {bid()}<p></p>
        <p>{item.description}</p>
      </div>
      <div className="current-bid-container">
        <h6>HIGH SCORES</h6>
        <CurrentBid id={parseInt(id)} />
      </div>
    </div>
  </>

}