import { createContext, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // BORDE FLYTTAS TILL LOGIN COMPONENT OCH INTE RETURNERA login NEDAN
  const login = () => {
    setIsLoggedIn(true)
  }

  return (
    <GlobalContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </GlobalContext.Provider>
  )

}

export { GlobalProvider, GlobalContext }
