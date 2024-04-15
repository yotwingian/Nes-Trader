import { useState, useEffect } from "react"

export default function TotalBids({ slug }) {

  const [totalBids, setTotalBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/total/" + slug)
      const data = await response.json()
      setTotalBids(data.count)
    }
    load()
  }, []) // totalBids här skapar evighetsloop pga setTotalBids i samma useEffect

  if (totalBids != null) {
    return <>
      {totalBids} bids
    </>
  } else {
    return <>
      0 bids
    </>
  }

}
