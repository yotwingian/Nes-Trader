
function AuctionForm() {
  return <form onSubmit={PostAuction}>
    <div>
      <label>Title:</label>
    </div>
    <div>
      <input type="text" name="title" required />
    </div>
    <div>
      <label>Release Year:</label>
    </div>
    <div>
      <input type="number" name="releaseYear" required />
    </div>
    <div>
      <label>Genre:</label>
    </div>
    <div>
      <input type="text" name="genre" required />
    </div>
    <div>
      <label>Description:</label>
    </div>
    <div>
      <textarea name="description" required />
    </div>
    <div>
      <label>Image URL:</label>
    </div>
    <div>
      <input type="text" name="img" required />
    </div>
    <div>
      <label>Start Date:</label>
    </div>
    <div>
      <input type="datetime-local" name="startDateTime" required />
    </div>
    <div>
      <label>End Date:</label>
    </div>
    <div>
      <input type="datetime-local" name="endDateTime" required />
    </div>
    <div>
      <label>Start Price:</label>
    </div>
    <div>
      <input type="number" name="startPrice" required />
    </div>
    <div>
      <label>Reserve Price:</label>
      <div>
        <input type="number" name="reservePrice" required />
      </div>
      <button type="submit" className="newGameButton">START</button>
    </div>
  </form>

}

async function PostAuction(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  event.target.reset();

}

export default AuctionForm
