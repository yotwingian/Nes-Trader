import { useState,useEffect, useContext } from 'react';
import { GlobalContext } from '../components/GlobalContext.jsx'
function AuctionForm() {
  const [message, setMessage] = useState(null); 
  const { user } = useContext(GlobalContext)
  useEffect(() => {
    if (message) {
      
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function PostAuction(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const info = Object.fromEntries(data);
    const response = await fetch("/api/items/post/" + user, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (response.ok) {
      
      setMessage("Your auction has been posted successfully.");
    } else {
      
      const errorData = await response.json();
      setMessage("An error occurred while submitting the data: " + errorData.message);
    }

    event.target.reset();
  }

  return (
    <form onSubmit={PostAuction}>
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
      {message && <div className="addItemMessage">{message}</div>} 
    </form>
  );
}

export default AuctionForm;


  