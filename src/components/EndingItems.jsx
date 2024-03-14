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
        <section key={item.id}>
          <Link to={{ pathname: `/item-details/${item.id}` }} style={{ textDecoration: 'none' }}>
            <img src={item.img} alt={item.title} />
            
            <h5>{item.title}</h5> <br /> <p> Released: {item.releaseYear} <br />  Genre: {item.genre} <br />
              <MaxBid id={parseInt(item.id)} startPrice={parseInt(item.startPrice)} /> <br /> <TotalBids id={parseInt(item.id)} /> <br />
              Game over in:{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
            </p>
          </Link>
        </section>
      ))}
      </div>
    </div>
  );
};

export default EndingItems;
