import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "./CountdownRenderer.jsx"
import TotalBids from "../components/TotalBids.jsx"
import MaxBid from "../components/MaxBid.jsx"

export default function Items() {

  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [sortType, setSortType] = useState('endingSoon')
  const [searchString, setSearchString] = useState(null)

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
    const newSearchstring = event.target.value.toLowerCase()
    setSearchString(newSearchstring)
    const searchResult = items.filter(item =>
      item.title.toLowerCase().includes(newSearchstring) ||
      item.releaseYear.toString().includes(newSearchstring) ||
      item.genre.toLowerCase().includes(newSearchstring) ||
      item.description.toLowerCase().includes(newSearchstring)
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
      case 'endingSoon': {
        let ongoingItems = [], endedItems = []

        for (let item of sortedItems) {
          if (new Date(item.endDateTime) < Date.now()) {
            endedItems.push(item)
          } else {
            ongoingItems.push(item)
          }
        }

        ongoingItems.sort((a, b) => new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime())
        endedItems.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime())
        sortedItems = ongoingItems.concat(endedItems)
        break
      }
      case 'latest':
        sortedItems.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime))
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
    <h1 className="main-h1-3">Select Game</h1>
    <search >
      <input type="text" onChange={filter} placeholder="Search..." />
      <select onChange={handleSortChange} className="btn btn-outline-seconda">
        <option value="endingSoon">Ending Soon</option>
        <option value="title">Title</option>
        <option value="releaseYear">Release Year</option>
        <option value="latest">Latest</option>
      </select>
    </search>
    {filteredItems != "" ? (
      <div className="items-container">
        {filteredItems.map(item => (
          <section key={item.slug}>
            <div className="itemsCard">
              <Link to={{ pathname: `/item/${item.slug}` }} style={{ textDecoration: 'none' }}>
                <img src={item.img} alt={item.title} />
                <h5>{item.title}</h5>
                <div className="itemsFlex">
                  <div><p className="itemstext">{item.releaseYear} | {item.genre}</p></div>
                  <div className="items"><MaxBid slug={item.slug} startPrice={item.startPrice} /> | <TotalBids slug={item.slug} /></div>
                  <div className="items">{" "} <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}</div>
                </div>
              </Link>
            </div>
          </section>
        ))}
      </div >
    ) : <h5 className="NoItems">No games matching '{searchString}' found</h5>}
  </>

}
