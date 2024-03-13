import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../components/GlobalContext.jsx'

function BidForm({ itemId, startPrice }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [Bid, setBid] = useState([]);
  const [maxBidAmount, setMaxBidAmount] = useState(0);
  const { user } = useContext(GlobalContext)

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

  }, []); // Bid här skapar evighetsloop pga setBid i samma useEffect. itemId verkar inte behövas eller påverka något här.


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
      alert("The new bid must be greater than the existing bid. Current bid: " + maxBidAmount);
      return;
    }
    else if (parseFloat(info.amount) < startPrice) {
      alert("The new bid must be equal to or greater than the start price. Current start price: " + startPrice);
      return;
    }

    await fetch("/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    alert("Your bid was successful. Your bid: " + info.amount);

    event.target.reset();
  }

  return (
    <form onSubmit={PostBid}>
      <input type="hidden" name="bidder" value={user.username} />

      <input type="number" placeholder="Amount" name="amount" required />

      <input type="hidden" name="timespan" value={currentDateTime.toISOString()} readOnly />

      <input type="hidden" name="itemId" value={itemId} />

      <input type="submit" value="Bid now!" />
    </form>
  );
}

BidForm.propTypes = {
  itemId: PropTypes.number
};

export default BidForm;
