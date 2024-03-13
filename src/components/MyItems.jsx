import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import CountdownRenderer from "../components/CountdownRenderer.jsx";
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function MyItems() {
  const { isLoggedIn } = useContext(GlobalContext);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
            
      async function load() {
        const response = await fetch("/api/mylistings");
        const data = await response.json();
        setUserListings(data);
      }
      load();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Your Listings</h1>
      {userListings.map(item => (
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
}


