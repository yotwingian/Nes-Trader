function BidForm() {

  const timestampNow = new Date();
  console.log(timestampNow)


  
  return <form onSubmit={PostBid}>
    <label>Bidder:</label>
    <input type="text" name="bidder" required />

    <label>Amount:</label>
    <input type="number" name="amount" required />

    <label>Time:</label>
    <input type="dateTime-locall" name="timestamp" required />

    <input type="submit" />
  </form>

}

async function PostBid(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  await fetch("/api/bids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  event.target.reset();

}

export default BidForm
