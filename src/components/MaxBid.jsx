import { useState, useEffect } from "react"

export default function MaxBid({ id, startPrice }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/")
      const data = await response.json()
      setBids(data)
    }
    load()
  }, []) // bids här skapar evighetsloop pga setBids i samma useEffect

  const thisItemBids = bids.filter(bid => bid.itemId.toString().includes(id))
  const maxBid = thisItemBids.reduce((acc, bid) => {
    return (acc = acc > parseInt(bid.amount) ? acc : parseInt(bid.amount))
  }, 0)

  if (maxBid >= startPrice) {
    return <>
      Current bid: {maxBid}
    </>
  }
  else {
    return <>
      Start price: {startPrice}
    </>
  }

}
