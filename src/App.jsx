import { useState } from 'react'
import './App.css'
import TerminalPortfolio from './components/TerminalPortfolio'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TerminalPortfolio />} />
        <Route path="/terminal" element={<TerminalPortfolio />} />
        <Route path ="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
