import { useState, useEffect } from "react"
import { formatDateString } from './formatDate.js'


export default function Items() {

  const [items, setItems] = useState([])

  useEffect(() => {

    async function load() {
      try {
        const response = await fetch("/api/items")
        const items = await response.json()
        console.log(items)
        setItems(items)
      } catch (error) {
        console.error("Error message: ", error)
      }
    }
    load()

  }, [])

  return (
    <>
      <h1>Games</h1>
      {
        items.map(item => <section key={item.id}>
          <img src={item.img} width="100" />
          <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Ending: {formatDateString(item.endDateTime)} </p>
        </section>)
      }
    </>
  )

}
