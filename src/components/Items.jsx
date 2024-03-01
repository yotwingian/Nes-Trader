import { useState, useEffect } from "react"
import Countdown from "react-countdown"

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
          <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Ending: {item.endDateTime.slice(0, 10)} {item.endDateTime.slice(11, 16)} | Auktionen avslutas om: <Countdown date={new Date(item.endDateTime)} /> </p>
        </section>)
      }
    </>
  )

}
