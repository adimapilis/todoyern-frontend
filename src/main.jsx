import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {MainContextProvider} from "./contexts/MainContext";
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <Router>
        <App/>
      </Router>
    </MainContextProvider>
  </React.StrictMode>
  )
