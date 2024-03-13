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
      <div className="items-containerx">
        {userListings.map(item => (
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
}


