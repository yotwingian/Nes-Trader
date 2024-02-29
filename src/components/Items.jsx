import { useState, useEffect } from "react"


export default function Items() {

  const [items, setItems] = useState([])

  useEffect(() => {
      
    async function load() {
      try {
        const response = await fetch("api/items")
        const items = await response.json()
        console.log(items)
      } catch (error) {
        console.error("Error message: ", error)
      }
      setItems(items)
    }
    load()

  }, [])

  return (
    <>
    
    </>
  )

}
