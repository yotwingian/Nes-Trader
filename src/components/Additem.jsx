
function AuctionForm() {
  return <form onSubmit={PostAuction}>
    <label>Title:</label>
    <input type="text" name="title" required />

    <label>Release Year:</label>
    <input type="number" name="releaseYear" required />

    <label>Genre:</label>
    <input type="text" name="genre" required />

    <label>Description:</label>
    <textarea name="description" required />

    <label>Image URL:</label>
    <input type="text" name="img" required />

    <label>Start Date:</label>
    <input type="datetime-local" name="startDateTime" required />

    <label>End Date:</label>
    <input type="datetime-local" name="endDateTime" required />

    <label>Start Price:</label>
    <input type="number" name="startPrice" required />

    <label>Reserve Price:</label>
    <input type="number" name="reservePrice" required />

    <input type="submit" />
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
