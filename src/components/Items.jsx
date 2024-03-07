import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Countdown from "react-countdown"
import { GlobalContext } from "./GlobalContext.jsx"
import CountdownRenderer from "./CountdownRenderer.jsx"

export default function Items() {

  const { items, setItems } = useContext(GlobalContext)
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {

    async function load() {
      try {
        const response = await fetch("/api/items")
        const data = await response.json()
        setItems(data)
        setFilteredItems(data)
        console.log(filteredItems)
      } catch (error) {
        console.error("Error message: ", error)
      }
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

    setFilteredItems(searchResult)
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
              <Countdown date={new Date(item.endDateTime)} renderer={CountdownRenderer} />{" "}
            </p>
          </Link>
        </section>
      ))}
    </>
  )

}
