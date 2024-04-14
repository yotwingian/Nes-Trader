import { useState, useEffect } from "react"
import PropTypes from 'prop-types'

export default function MaxBid({ slug, startPrice }) {

  const [bids, setBids] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/item/" + slug)
      const data = await response.json()
      setBids(data)
    }
    load()
  }, []) // bids här skapar evighetsloop pga setBids i samma useEffect

  const maxBid = bids.reduce((acc, bid) => {
    return (acc = acc > bid.amount ? acc : bid.amount)
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

MaxBid.propTypes = {
  slug: PropTypes.string,
  startPrice: PropTypes.number
}
