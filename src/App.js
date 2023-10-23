import React from 'react'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RoutesConfig } from './routes-config'

function App() {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <Routes>
          {RoutesConfig.map((route) => (
            <Route
              key={route.name}
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
