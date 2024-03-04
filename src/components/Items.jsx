import { useContext } from "react"
import Countdown from "react-countdown"
import { GlobalContext } from "./GlobalContext.jsx"

export default function Items() {

  const { items, filtered, setFiltered } = useContext(GlobalContext)

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Game over!</span>
    } else {
      return <span>{days} days, {hours} hours, {minutes} minutes och {seconds} seconds Bid now!</span>;
    }

  }

  function filter(event) {
    const searchString = event.target.value.toLowerCase()

    const searchResult = items.filter(item =>
      item.title.toLowerCase().includes(searchString) ||
      item.releaseYear.toString().includes(searchString) ||
      item.genre.toLowerCase().includes(searchString) ||
      item.description.toLowerCase().includes(searchString))
    
    setFiltered(searchResult)
  }

  return (
    <>
      <search>
        <input type="text" onChange={filter} placeholder="Enter search here..." />
      </search>

      <h1>Games</h1>
      {
        filtered.map(item => <section key={item.id}>
          <img src={item.img} width="100" />
          <p>{item.title} | {item.releaseYear} | {item.genre} | Start price: {item.startPrice} | Game ends in: <Countdown date={new Date(item.endDateTime)} renderer={renderer} /> </p>
        </section>)
      }
    </>
  )

}
