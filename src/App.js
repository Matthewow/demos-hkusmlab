import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { MarketReactionPage } from './pages/MarketReaction'
import { NavBar } from './components/NavBar'

function App() {
  const [page, setPage] = React.useState('market-reaction')
  return (
    <>
      <NavBar setPage={setPage} page={page} />
      {page === 'driver-order-matching' && <DriverOrderMatchingPage />}
      {page === 'market-reaction' && <MarketReactionPage />}
    </>
  )
}

export default App
