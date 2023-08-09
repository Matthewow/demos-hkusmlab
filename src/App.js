import React, { useEffect } from 'react'
import { MainPage } from './pages/MainPage'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Box } from '@mui/material'

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#e3e3e3' // Change to the color you want
  }, [])
  return <MainPage />
}

export default App
