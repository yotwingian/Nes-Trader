import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import { GlobalContext } from "../components/GlobalContext.jsx"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function MyItems() {

  const { isLoggedIn, user } = useContext(GlobalContext)
  const [userItems, setUserItems] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      async function load() {
        const response = await fetch("/api/items/" + user)
        const data = await response.json()
        setUserItems(data)
      }
      load()
    }
  }, [isLoggedIn])

  return <>
    {userItems != "" ? (
      <div>
        <h1 id="myitems">Player Items</h1>
        <div className="items-container">
          {userItems.map(item => (
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
    ) : (null)}
  </>
  
}
