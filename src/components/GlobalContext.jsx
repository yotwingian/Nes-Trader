import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/items")
        const itemsData = await response.json()

        setItems(itemsData)
      } catch (error) {
        console.error("Error message: ", error)
      }
    }
    load()
  }, [items])

  const login = () => {
    setIsLoggedIn(true);
  };

  return (
    <GlobalContext.Provider value={{ items, isLoggedIn, login }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };
