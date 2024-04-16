import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import CountdownRenderer from "../components/CountdownRenderer.jsx";
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function MyBids() {

  const { isLoggedIn, user } = useContext(GlobalContext);
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {

      async function load() {
        const response = await fetch("/api/bids/" + user);
        const data = await response.json();
        setUserBids(data);
        console.log(data)
      }
      load();
    }
  }, [isLoggedIn]);

  if (!userBids) {
    return null
  }

  return (
    <div>
      <h1>Player Bids</h1>
      <div className="items-containerx">
        {userBids.map(item => (
          <section key={item.id}>
            <div >
              <Link to={{ pathname: `/item/${item.slug}` }} style={{ textDecoration: 'none' }}>
                <img src={item.img} alt={item.title} />
                <h5>{item.title}</h5>
                <div><p className="itemstext">{item.releaseYear} | {item.genre}</p></div>
                <div className="items"><MaxBid id={item.id} startPrice={item.startPrice} /> | <TotalBids id={item.id} /></div>
                <div className="items">{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}</div>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
