
function AuctionForm() {
  return <form onSubmit={PostAuction}>
    <div>
      <label>Title:</label>
    </div>
    <div>
      <input type="text" name="title" placeholder="Title" required />
    </div>
    <div>
      <label>Release Year:</label>
    </div>
    <div>
      <input type="number" name="releaseYear" placeholder="Release Year" required />
    </div>
    <div>
      <label>Genre:</label>
    </div>
    <div>
      <input type="text" name="genre" placeholder="Genre" required />
    </div>
    <div>
      <label>Description:</label>
    </div>
    <div>
      <textarea name="description" placeholder="Description" required />
    </div>
    <div>
      <label>Image URL:</label>
    </div>
    <div>
      <input type="text" name="img" placeholder="Image URL" required />
    </div>
    <div>
      <label>Start Date:</label>
    </div>
    <div>
      <input type="datetime-local" name="startDateTime" placeholder="Start Date" required />
    </div>
    <div>
      <label>End Date:</label>
    </div>
    <div>
      <input type="datetime-local" name="endDateTime" placeholder="End Date" required />
    </div>
    <div>
      <label>Start Price:</label>
    </div>
    <div>
      <input type="number" name="startPrice" placeholder="Start Price" required />
    </div>
    <div>
      <label>Reserve Price:</label>
      <div>
        <input type="number" name="reservePrice" placeholder="Reserve Price" required />
      </div>
      <button type="submit" className="newGameButton">START</button>
    </div>
  </form>

}


async function PostAuction(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  const infoWithUser = { ...info, user: 1 }; // tillfallig hardkodad user
  await fetch("/api/items/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoWithUser),
  });

  event.target.reset();

}
export default AuctionForm
