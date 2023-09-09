import React, { useEffect } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { MarketReactionPage } from './pages/MarketReaction'
import { NavBar } from './components/NavBar'

function App() {
  // useEffect(() => {
  //   document.body.style.backgroundColor = '#e3e3e3' // Change to the color you want
  // }, [])
  // return <DriverOrderMatchingPage />
  return (
    <>
      <NavBar />
      <MarketReactionPage />
    </>
  )
}

export default App
