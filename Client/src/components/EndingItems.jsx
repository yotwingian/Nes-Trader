import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import MaxBid from "../components/MaxBid.jsx"
import TotalBids from "../components/TotalBids.jsx"

export default function EndingItems() {

  const [items, setItems] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items/ending-soon")
      const data = await response.json()
      setItems(data)
    }
    load()
  }, [])

  return (
    <div>
      <h1 id="h1-ending-items">Games Over Soon</h1>
      <div className="items-container">
        {items.map(item => (
          <section key={item.slug}>
            <div >
              <Link to={{ pathname: `/item/${item.slug}` }} style={{ textDecoration: 'none' }}>
                <img src={item.img} alt={item.title} />
                <h5>{item.title}</h5>
                <div><p className="itemstext">{item.releaseYear} | {item.genre}</p></div>
                <div className="items"><MaxBid slug={item.slug} startPrice={item.startPrice} /> | <TotalBids slug={item.slug} /></div>
                <div className="items">{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}</div>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  )

}
