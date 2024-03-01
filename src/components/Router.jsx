import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { GlobalProvider } from './GlobalContext.jsx'
import React from "react"
import Nav from './Nav.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import ItemDetails from '../pages/ItemDetails.jsx'
import MyPage from '../pages/MyPage.jsx'
import NewItem from '../pages/NewItem.jsx'
import NoPage from '../pages/NoPage.jsx'
import About from '../pages/About.jsx'
import HowTo from '../pages/HowTo.jsx'
import Contact from '../pages/Contact.jsx'
import Items from './Items.jsx'

export default function Router() {

  return (
    <GlobalProvider>
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
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="how-to" element={<HowTo />} />
          <Route path="items" element={<Items />} />

        </Routes>
      </main>
      <footer>
        <Link to="about">About</Link> |&nbsp;
        <Link to="contact">Contact</Link> |&nbsp;
        <Link to="how-to">How to</Link>
      </footer>
    </BrowserRouter>
    </GlobalProvider >
  )
  
}
