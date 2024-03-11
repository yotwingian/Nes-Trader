import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import CountdownRenderer from "../components/CountdownRenderer.jsx";

export default function MyBids() {
  const { isLoggedIn } = useContext(GlobalContext);
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      // Fixa api o mockajacka
      
      async function load() {
        const response = await fetch("/api/bids");
        const data = await response.json();
        setUserBids(data);
      }
      load();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Your Bids</h1>
      {userBids.map(item => (<Link to={{ pathname: `/item-details/${item.id}` }}>
        <img src={item.img} width="100" alt={item.title} />
        <p>
          {item.title} | {item.releaseYear} | {item.genre} | Start price:{" "} {item.startPrice} | Game over in:{" "}
          <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
        </p>
      </Link>

      ))}
    </div>
  );
}
