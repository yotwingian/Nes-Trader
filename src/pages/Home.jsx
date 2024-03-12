import { useState, useEffect, useContext } from "react";
import Items from "../components/Items.jsx";
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "../components/CountdownRenderer.jsx"
import MyBids from "../components/MyBids.jsx";
import MyItems from "../components/MyItems.jsx";
import { GlobalContext } from "../components/GlobalContext.jsx";
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function Home() {
  const { isLoggedIn } = useContext(GlobalContext);
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
      {isLoggedIn && (
        <>
          <MyBids />
          <MyItems />
        </>
      )}

       { <h1>Top 5 Ending Soon Items</h1> }
      {endingSoonItems.map(item => (
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
      
       { <h1>Top 5 Latest Items</h1> }
      {latestItems.map(item => (
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

      <h1>All Games</h1>
      <Items />
    </div>
  );
}
