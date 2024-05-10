import AddItem from '../components/Additem'
import { useContext } from "react"
import { GlobalContext } from '../components/GlobalContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function NewItem() {
  const { isLoggedIn } = useContext(GlobalContext)
  const navigate = useNavigate()

  if (isLoggedIn) {
    return (
      <>
        <AddItem />
      </>
    )
  } else {
    navigate('/login')
  }

}
