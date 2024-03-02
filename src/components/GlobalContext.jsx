import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

function GlobalProvider({  children }) {
  const [items, setItems] = useState([]);

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

  }, [])


  return (
    <GlobalContext.Provider value={{ items }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };