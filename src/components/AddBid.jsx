import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function BidForm({ itemId }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [Bid, setBid] = useState([]);
  const [maxBidAmount, setMaxBidAmount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/bids?itemId=${itemId}`);
      const data = await response.json();
      setBid(data);
    }
    load();
  }, [itemId, Bid]);

  useEffect(() => {
    const newMaxBidAmount = Bid.reduce((max, bid) => (parseFloat(bid.amount) > max ? parseFloat(bid.amount) : max), 0);
    setMaxBidAmount(newMaxBidAmount);
  }, [Bid]); 

  async function PostBid(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const info = Object.fromEntries(data);
    info.timespan = new Date(info.timespan).toISOString();
    info.itemId = parseInt(info.itemId);

    if (parseFloat(info.amount) <= maxBidAmount) {
      alert("The new bid must be equal to or greater than the existing bid. Current bid: " + maxBidAmount);
      return;
    }

    await fetch("/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    event.target.reset();
  }

  return (
    <form onSubmit={PostBid}>
      <label>Bidder:</label>
      <input type="text" name="bidder" required />

      <label>Amount:</label>
      <input type="number" name="amount" required />

      <input type="hidden" name="timespan" value={currentDateTime.toISOString()} readOnly />

      <input type="hidden" name="itemId" value={itemId} />

      <input type="submit" />
    </form>
  );
}

BidForm.propTypes = {
  itemId: PropTypes.number
};

export default BidForm;
