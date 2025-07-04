import React from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/index.jsx";


function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
