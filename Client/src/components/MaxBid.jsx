import { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function MaxBid({ slug, startPrice }) {

  const [maxBid, setMaxBid] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/max/" + slug)
      const data = await response.json()
      setMaxBid(data.amount)
    }
    load()
  }, []) // maxBid här skapar evighetsloop pga setMaxBid i samma useEffect

  if (maxBid != null) {
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
