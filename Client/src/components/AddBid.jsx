import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../components/GlobalContext.jsx'

function BidForm({ slug, startPrice }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [Bid, setBid] = useState([]);
  const [maxBidAmount, setMaxBidAmount] = useState();
  const { user } = useContext(GlobalContext)
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {

      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/bids/max/" + slug)
      const data = await response.json();
      setBid(data);
    }
    load();

  }, []); // Bid här skapar evighetsloop pga setBid i samma useEffect. itemId verkar inte behövas eller påverka något här.


  useEffect(() => {
    const newMaxBidAmount = Bid.amount;
    setMaxBidAmount(newMaxBidAmount);
    console.log(newMaxBidAmount)
  }, [Bid]);

  async function PostBid(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const info = Object.fromEntries(data);
    info.timespan = new Date(info.timespan).toISOString();
    info.itemId = parseInt(info.itemId);

    if (maxBidAmount == null && parseFloat(info.amount) < startPrice) {
      setMessage("The new bid must be equal to or greater than the start price. Start price: " + startPrice);
      return;
    }
    else if (maxBidAmount != null && parseFloat(info.amount) <= maxBidAmount) {
      setMessage("The new bid must be greater than the existing bid. Current bid: " + maxBidAmount);
      return;
    }

    const response = await fetch("/api/bids/post/" + slug, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    console.log(response)

    if (response.ok == true) {
      setMessage("Your bid was successful. Your bid: " + info.amount);
      event.target.reset();
    } else {
      setMessage("Failed to register bid, server returned: " + response.status)
    }

    setMaxBidAmount(info.amount)
  }



  return (
    <form onSubmit={PostBid}>
      <input type="hidden" name="bidder" value={user} />

      <input id="input-amount" type="number" placeholder="Bid" name="amount" required />

      <input type="hidden" name="timespan" value={currentDateTime.toISOString()} readOnly />

      <button id="btn-select-bid" type="submit" className='addBidButton'>SELECT</button>
      {message && <div className="notificationMessage1" id="addBidsMessage">{message}</div>}
    </form>
  );
}

BidForm.propTypes = {
  itemId: PropTypes.number,
  startPrice: PropTypes.number,
  slug: PropTypes.string
};

export default BidForm;
