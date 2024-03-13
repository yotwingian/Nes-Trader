import { useEffect, useState } from "react";

export default function MyPage() {


  const [user, setUser] = useState(null);
  const [sellingItems, setSellingItems] = useState([]);

  useEffect(() => {
    // Fetch the user information from local storage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // Parse the stored user information
      const user = JSON.parse(storedUser);
      setUser(user);

      // Assuming items is an array of items fetched from your API
      const filteredItems = items.filter(item => item.user === user.email);
      setSellingItems(filteredItems);
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <h2>Selling Items</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}! You can view your selling items here.</p>
          {/* Render your selling items based on the filtered items */}
          {sellingItems.map(item => (
            <div key={item.id}>
              {/* Render each item */}
              <p>{item.title}</p>
              {/* Add more details or components as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view your selling items.</p>
      )}
    </div>
  );
}
