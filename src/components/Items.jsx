import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "./CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"
import { sortItems } from '../components/sortItems.jsx'

export default function Items() {

  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [sortType, setSortType] = useState('endingSoon')


  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
      updateFilteredItems(data, sortType);
    }
    load();
  }, []);

  function filter(event) {
    const searchString = event.target.value.toLowerCase()
    const searchResult = items.filter(item =>
      item.title.toLowerCase().includes(searchString) ||
      item.releaseYear.toString().includes(searchString) ||
      item.genre.toLowerCase().includes(searchString) ||
      item.description.toLowerCase().includes(searchString)
    )
    sortItems(searchResult, sortType)
  }
  
  function updateFilteredItems(items, sortType) {
    const sortedItems = sortItems(items, sortType);
    setFilteredItems(sortedItems);
  }

  function handleSortChange(event) {
    setSortType(event.target.value)
    sortItems(filteredItems, event.target.value)
  }

  return <>
    <search>
      <input type="text" onChange={filter} placeholder="Enter search here..." />
      <select onChange={handleSortChange}>
        <option value="endingSoon">Ending Soon</option>
        <option value="title">Title</option>
        <option value="releaseYear">Release Year</option>
        <option value="latest">Latest</option>
      </select>
    </search>

    {filteredItems.map(item => (
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
  </>

}
