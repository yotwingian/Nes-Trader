import { useContext } from "react"
import { GlobalContext } from "../components/GlobalContext.jsx"
import MyBids from "../components/MyBids.jsx"
import MyItems from "../components/MyItems.jsx"
import EndingItems from "../components/EndingItems"
import LatestItems from "../components/LatestItems"
import Items from "../components/Items.jsx"

export default function Home() {

  const { isLoggedIn } = useContext(GlobalContext)

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

      <Items />
    </div>
  )

}
