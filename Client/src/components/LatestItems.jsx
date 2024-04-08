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
      const response = await fetch("/api/items/latest");
      const data = await response.json();

      setItems(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>New Games</h1>
      <div className="items-container">
      {items.map(item => (
        <section key={item.id}>
          <div >
            <Link to={{ pathname: `/item-details/${item.id}` }} style={{ textDecoration: 'none' }}>
              <img src={item.img} alt={item.title} />
              <h5>{item.title}</h5>
              <div><p className="itemstext">{item.releaseYear} | {item.genre}</p></div>
              <div className="items"><MaxBid id={parseInt(item.id)} startPrice={parseInt(item.startPrice)} /> | <TotalBids id={parseInt(item.id)} /></div>
              <div className="items">{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}</div>
            </Link>
          </div>
        </section>
      ))}
      </div>
    </div>
  );
};

export default LatestItems;
