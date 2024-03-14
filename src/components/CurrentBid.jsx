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
  const sortedBids = thisItemBids.sort((a, b) => b.amount - a.amount);


  // Spara thisItemBids i en variabel
  const bidsList = (
    <>
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
  );
  return bidsList;
}
