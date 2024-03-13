import AddItem from '../components/Additem'
import { useContext } from "react"
import { GlobalContext } from '../components/GlobalContext.jsx'
import { useNavigate } from 'react-router-dom'; // Import useHistory



export default function NewItem() {
  const { isLoggedIn } = useContext(GlobalContext)
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <>
        <h1>Sell!</h1>
        <AddItem />
      </>
    )
  } else {
    navigate('/login');

  }




}
