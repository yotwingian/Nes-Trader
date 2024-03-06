import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { GlobalContext } from "./GlobalContext.jsx";

export default function Items() {
  const { items } = useContext(GlobalContext);
  const [filteredItems, setFilteredItems] = useState(items);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Game over!</span>;
    } else {
      return (
        <span>
          {days} days, {hours} hours, {minutes} minutes och {seconds} seconds Bid
          now!
        </span>
      );
    }
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  function filter(event) {
    const searchString = event.target.value.toLowerCase();

    const searchResult = items.filter(item =>
        item.title.toLowerCase().includes(searchString) ||
        item.releaseYear.toString().includes(searchString) ||
        item.genre.toLowerCase().includes(searchString) ||
        item.description.toLowerCase().includes(searchString)
    );

    setFilteredItems(searchResult);
  }

  return (
    <>
      <search>
        <input type="text" onChange={filter} placeholder="Enter search here..." />
      </search>

      {filteredItems.map(item => (
        <section key={item.id}>
          <Link to={{ pathname: `/item-details/${item.id}` }}>
            <img src={item.img} width="100" alt={item.title} />
            <p>
              {item.title} | {item.releaseYear} | {item.genre} | Start price:{" "}
              {item.startPrice} | Game ends in:{" "}
              <Countdown date={new Date(item.endDateTime)} renderer={renderer} />{" "}
            </p>
          </Link>
        </section>
      ))}
    </>
  );
}
