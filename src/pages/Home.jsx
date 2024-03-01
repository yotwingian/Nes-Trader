import React, { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";

export default function Home() {
  const contextValue = useContext(GlobalContext);
  console.log(contextValue);
  return (
    <h1>Home</h1>
  )

}
