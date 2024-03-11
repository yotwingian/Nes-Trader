import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import CountdownRenderer from "./CountdownRenderer.jsx"

export default function SellingItems() {

  const [items, setItems] = useState([])
  const [sellingItems, setSellingItems] = useState([])
  const [sortType, setSortType] = useState('endingSoon') // default sort type
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const userResponse = await fetch("/api/users");
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch items data
      const itemsResponse = await fetch("/api/items");
      const itemsData = await itemsResponse.json();
      setItems(itemsData);
      sortItems(itemsData, sortType);
    }
    load()
  }, [sortType])

  function filter(event) {
    const searchString = event.target.value.toLowerCase()
    const searchResult = items.filter(item =>
      (item.user === user.email) && (
        item.title.toLowerCase().includes(searchString) ||
        item.releaseYear.toString().includes(searchString) ||
        item.genre.toLowerCase().includes(searchString) ||
        item.description.toLowerCase().includes(searchString)
      ))
    sortItems(searchResult)
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
    setSellingItems(sortedItems)
  }

  function handleSortChange(event) {
    setSortType(event.target.value)
    sortItems(filteredItems, event.target.value)
  }

  return <>


    {sellingItems.map(item => (
      <section key={item.id}>
        <Link to={{ pathname: `/item-details/${item.id}` }}>
          <img src={item.img} width="100" alt={item.title} />
          <p>
            {item.title} | {item.releaseYear} | {item.genre} | Start price:{" "} {item.startPrice} | Game over in:{" "}
            <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
          </p>
        </Link>
      </section>
    ))}
  </>

}
