import { useContext } from "react"
import MyBids from "../components/MyBids.jsx"
import MyItems from "../components/MyItems.jsx"
import { GlobalContext } from "../components/GlobalContext.jsx"
import LatestItems from '../components/LatestItems'
import EndingItems from '../components/EndingItems'
import Items from "../components/Items.jsx"

export default function Home() {

  const { isLoggedIn } = useContext(GlobalContext)

  // <MyBids />
  // <MyItems />
  // Borttagna nedan tills de är implementerade i Server och refakturerade här

  return (
    <div>
      {isLoggedIn && (
        <>
          
          
        </>
      )}

      <EndingItems />
      <LatestItems />

      <h1>Select Game</h1>
      <Items />
    </div>
  )
  
}
