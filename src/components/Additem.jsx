
function AuctionForm() {
  return <form onSubmit={PostAuction}>
    <div className="form-row"><div className="form-group col-md-6">
    <label>Title:</label>
      <input type="text" className="form-control" name="title" required />

    <label>Release Year:</label>
      <input type="number" className="form-control" name="releaseYear" required />

    <label>Genre:</label>
      <input type="text" className="form-control" name="genre" required />

    <label>Description:</label>
      <textarea name="description" className="form-control" required />

    <label>Image URL:</label>
      <input type="text" className="form-control" name="img" required />

    <label>Start Date:</label>
      <input type="datetime-local" className="form-control" name="startDateTime" required />

    <label>End Date:</label>
      <input type="datetime-local" className="form-control" name="endDateTime" required />

    <label>Start Price:</label>
      <input type="number" className="form-control" name="startPrice" required />

    <label>Reserve Price:</label>
      <input type="number" className="form-control" name="reservePrice" required />

      <input type="submit" className="btn btn-outline-primary" value="START"/>
    </div></div>
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
