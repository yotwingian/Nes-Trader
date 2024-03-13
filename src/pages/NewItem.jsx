import AddItem from '../components/Additem'
import { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from '../components/GlobalContext.jsx'



export default function NewItem() {
  const { isLoggedIn } = useContext(GlobalContext)
  
  if (isLoggedIn) { 
    return (
      <>
        <h1>Sell!</h1>
        <AddItem />
      </>
    )
  } else { 
    return <Link to="/login" style={{ textDecoration: 'none' }}>Please sign in!</Link>
  }
  
  


}
