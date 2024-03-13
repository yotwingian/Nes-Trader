import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import MaxBid from "../components/MaxBid.jsx"
import TotalBids from "../components/TotalBids.jsx"

const LatestItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items");
      const data = await response.json();

      const sortedByLatest = data.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
      setItems(sortedByLatest.slice(0, 5));
    }
    load();
  }, []);

  return (
    <div>
      <h1>Latest Games</h1>
      {items.map(item => (
        <section key={item.id}>
          <Link to={{ pathname: `/item-details/${item.id}` }}>
            <img src={item.img} width="100" alt={item.title} />
            <p>
              {item.title} | {item.releaseYear} | {item.genre} |
              <MaxBid id={parseInt(item.id)} startPrice={parseInt(item.startPrice)} /> | <TotalBids id={parseInt(item.id)} /> |
              Game over in:{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
            </p>
          </Link>
        </section>
      ))}
    </div>
  );
};

export default LatestItems;
