import React from 'react'
import { DriverOrderMatchingPage } from './pages/DriverOrderMatching'
import { MarketReactionPage } from './pages/MarketReaction'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { RoutesConfig } from './routes-config'

function App() {
  return (
    <React.StrictMode>
      <NavBar />
      <Router>
        <Routes>
          {RoutesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Router>
    </React.StrictMode>
  )
}

export default App
