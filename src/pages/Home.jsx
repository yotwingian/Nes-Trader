import { useContext } from "react";
import MyBids from "../components/MyBids.jsx";
import MyItems from "../components/MyItems.jsx";
import { GlobalContext } from "../components/GlobalContext.jsx";
import LatestItems from '../components/LatestItems';
import EndingItems from '../components/EndingItems';
import Items from "../components/Items.jsx";

export default function Home() {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <div>
      {isLoggedIn && (
        <>
          <MyBids />
          <MyItems />
        </>
      )}

      <EndingItems />
      <LatestItems />

      <h1>All Games</h1>
      <Items />
    </div>
  );
}
