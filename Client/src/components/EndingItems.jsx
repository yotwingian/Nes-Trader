import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import MaxBid from "../components/MaxBid.jsx"
import TotalBids from "../components/TotalBids.jsx"

const EndingItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items");
      const data = await response.json();

      const sortedByEndingSoon = data.sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime));
      setItems(sortedByEndingSoon.slice(0, 5));
    }
    load();
  }, []);

  return (
    <div>
      <h1>Games Over Soon</h1>
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
  );
};

export default EndingItems;
