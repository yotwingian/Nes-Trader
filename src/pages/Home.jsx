import { useState, useEffect, useContext } from "react";
import Items from "../components/Items.jsx";
import MyBids from "../components/MyBids.jsx";
import MyItems from "../components/MyItems.jsx";
import { GlobalContext } from "../components/GlobalContext.jsx";
import LatestItems from '../components/LatestItems';
import EndingItems from '../components/EndingItems';
import { sortItems } from '../components/Items';

export default function Home() {
  const { isLoggedIn } = useContext(GlobalContext);
  const [endingSoonItems, setEndingSoonItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/items");
      const data = await response.json();

      const sortedByEndingSoon = sortItems([...data], 'endingSoon');
      setEndingSoonItems(sortedByEndingSoon.slice(0, 5));

      const sortedByLatest = sortItems([...data], 'latest');
      setLatestItems(sortedByLatest.slice(0, 5));
    }
    load();
  }, []);


  return (
    <div>
      {isLoggedIn && (
        <>
          <MyBids />
          <MyItems />
        </>
      )}

      <EndingItems items={endingSoonItems} />
      <LatestItems items={latestItems} />

      <h1>All Games</h1>
      <Items />
    </div>
  );
}
