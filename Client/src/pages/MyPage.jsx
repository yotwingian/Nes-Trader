import { useContext } from "react"
import { GlobalContext } from "../components/GlobalContext.jsx"
import MyBids from "../components/MyBids.jsx"
import MyItems from "../components/MyItems.jsx"

export default function MyPage() {
  const { isLoggedIn } = useContext(GlobalContext)

  return <>
    {isLoggedIn && (
      <div>
        <h1 id="mypage">Player Page</h1>
        <MyBids />
        <MyItems />
      </div>
    )}
    <h1>Please sign in!</h1>
  </>
   
}
