import { useState, useEffect } from "react"

export default function CurrentBid({ slug }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/item/" + slug)
      const data = await response.json()
      setBids(data)
    }
    const intervalId = setInterval(load, 1000) // interval - resurskrävande!
    load()
    return () => clearInterval(intervalId) // clear after unmounting - resurskrävande!
  }, [slug]) // slug - resurskrävande!

  const sortedBids = bids.sort((a, b) => b.amount - a.amount)

  return <>
    <ul style={{ listStyleType: 'none', padding: 0, }}>
      <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
        <div style={{ textAlign: 'left' }}>Player</div>
        <div style={{ textAlign: 'right' }}>Bid</div>
      </li>
      <p></p>
      {sortedBids.map((bid, index) => (
        <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left' }}>{bid.bidder}</div>
          <div style={{ textAlign: 'right' }}>{bid.amount}</div>
        </li>
      ))}
    </ul>
  </>
  
}
