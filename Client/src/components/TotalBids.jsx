import { useState, useEffect } from "react"

export default function TotalBids({ slug }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/item/" + slug)
      const data = await response.json()
      setBids(data)
    }
    load()
  }, []) // bids här skapar evighetsloop pga setBids i samma useEffect

  const totalBids = bids.length

  return <>
    {totalBids} bids
  </>

}
