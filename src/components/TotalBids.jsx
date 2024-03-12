import { useState, useEffect } from "react"

export default function TotalBids({ id }) {
  
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
  const totalBids = thisItemBids.length
  
  return <>
    {totalBids} bids
  </>

}
