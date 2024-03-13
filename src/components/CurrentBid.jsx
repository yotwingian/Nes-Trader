import { useState, useEffect } from "react"

export default function CurrentBid({ id }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/")
      const data = await response.json()
      setBids(data)
    }
    load()
  }, [])

  const thisItemBids = bids.filter(bid => bid.itemId.toString().includes(id))


  // Spara thisItemBids i en variabel
  const bidsList = (
    <>
      <ul>
        {thisItemBids.map((bid, index) => (
          <li key={index}>
            Bidder: {bid.bidder}, Amount: {bid.amount}
          </li>
        ))}
      </ul>
    </>
  )

  return bidsList;
}
