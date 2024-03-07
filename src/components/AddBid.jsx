import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

function BidForm({ itemId }) {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <form onSubmit={PostBid}>
      <label>Bidder:</label>
      <input type="text" name="bidder" required />

      <label>Amount:</label>
      <input type="number" name="amount" required />

      <input type="hidden" name="timespan" value={currentDateTime} readOnly />

      <input type="hidden" name="itemId" value={itemId} />


      <input type="submit" />
    </form>
  );
}

async function PostBid(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  info.timespan = new Date(info.timespan).toISOString();
  info.itemId = parseInt(info.itemId)
  
  await fetch("/api/bids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  event.target.reset();
}

BidForm.propTypes = {
  itemId: PropTypes.number
};


export default BidForm;
