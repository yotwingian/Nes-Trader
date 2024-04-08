import { useState, useEffect } from "react"

export default function CurrentBid({ id }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/item/bids/" + id)
      console.log(response)
      const data = await response.json()
      console.log
      setBids(data)
    }
    const intervalId = setInterval(load, 1000); //interval
    load();
    return () => clearInterval(intervalId); //clear after unmounting

  }, [id]) // id 




  // Spara thisItemBids i en variabel
  const bidsList = (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
        <div style={{ textAlign: 'left' }}>Player</div>
        <div style={{ textAlign: 'right' }}>Bid</div>
      </li>
      {bids.map((bid) => (
        <li key={bid.bids_id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left' }}>{bid.username}</div>
          <div style={{ textAlign: 'right' }}>{bid.bids_amount}</div>
        </li>
      ))}
    </ul>
  );

  return bidsList;
}
