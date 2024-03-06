import { useState, useEffect } from 'react';

function BidForm({ itemId }) {

  const [currentDateTime, setCurrentDateTime] = useState(formatDateTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function formatDateTime(dateTime) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Europe/Stockholm' // Tidszon för Sverige
    };

    return dateTime.toLocaleString('sv-SE', options);
  }

  return (
    <form onSubmit={PostBid}>
      <label>Bidder:</label>
      <input type="text" name="bidder" required />

      <label>Amount:</label>
      <input type="number" name="amount" required />

      <label>Time:</label>
      <input type="text" name="timespan" value={currentDateTime} readOnly />

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




export default BidForm;
