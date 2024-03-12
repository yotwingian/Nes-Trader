import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "./CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function Items() {

  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [sortType, setSortType] = useState('endingSoon') // default sort type


  useEffect(() => {
    async function load() {

      const response = await fetch("/api/items")
      const data = await response.json()
      setItems(data)
      sortItems(data, sortType)

    }
    load()
  }, [])

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

  function sortItems(sortedItems, sortType) {
    switch (sortType) {
      case 'title':
        sortedItems.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'releaseYear':
        sortedItems.sort((a, b) => a.releaseYear - b.releaseYear)
        break
      case 'endingSoon':
        sortedItems.sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime))
        break
      case 'latest':
        sortedItems.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime)) // assuming items have a startDateTime property
        break
      default:
        break
    }
    setFilteredItems(sortedItems)
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
