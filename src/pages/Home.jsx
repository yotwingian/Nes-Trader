import { useState, useEffect } from "react";
import Items from "../components/Items.jsx";
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "../components/CountdownRenderer.jsx"

export default function Home() {
  const [endingSoonItems, setEndingSoonItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items");
      const data = await response.json();

     
      const sortedByEndingSoon = [...data].sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime));
      setEndingSoonItems(sortedByEndingSoon.slice(0, 5));

      
      const sortedByLatest = [...data].sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
      setLatestItems(sortedByLatest.slice(0, 5));
    }
    load();
  }, []);

  return (
    <div>
       { <h1>Top 5 Ending Soon Items</h1> }
      {endingSoonItems.map(item => (
        <Link to={{ pathname: `/item-details/${item.id}` }}>
          <img src={item.img} width="100" alt={item.title} />
          <p>
            {item.title} | {item.releaseYear} | {item.genre} | Start price:{" "} {item.startPrice} | Game over in:{" "}
            <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
          </p>
        </Link>
      ))}
      
       { <h1>Top 5 Latest Items</h1> }
      {latestItems.map(item => (
        <Link to={{ pathname: `/item-details/${item.id}` }}>
          <img src={item.img} width="100" alt={item.title} />
          <p>
            {item.title} | {item.releaseYear} | {item.genre} | Start price:{" "} {item.startPrice} | Game over in:{" "}
            <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
          </p>
        </Link>
      ))}

      <h1>All Games</h1>
      <Items />
    </div>
  );
}
