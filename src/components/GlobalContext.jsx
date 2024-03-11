import { createContext, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // BORDE FLYTTAS TILL LOGIN COMPONENT OCH INTE RETURNERA login NEDAN
  const login = () => {
    setIsLoggedIn((isLoggedIn) => (!isLoggedIn))
  }

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, login }}>
      {children}
    </GlobalContext.Provider>
  )

}

export { GlobalProvider, GlobalContext }
