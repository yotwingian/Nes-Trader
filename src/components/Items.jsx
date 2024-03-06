import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { GlobalContext } from "./GlobalContext.jsx";

export default function Items() {
  const { items } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

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


  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.releaseYear.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase)
  );

  return (
    <>
      <search>
        <input
          type="text"
          placeholder="Enter search here..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </search>

      <h1>Games</h1>
      {filteredItems.map((item) => (
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
