import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from "react"
import Nav from './Nav.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import ItemDetails from '../pages/ItemDetails.jsx'
import MyPage from '../pages/MyPage.jsx'
import NewItem from '../pages/NewItem.jsx'
import NoPage from '../pages/NoPage.jsx'

export default function Router() {

  return (
    <BrowserRouter>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="my-page" element={<MyPage />} />
          <Route path="item-details" element={<ItemDetails />} />
          <Route path="new-item" element={<NewItem />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </BrowserRouter>
  )
  
}
