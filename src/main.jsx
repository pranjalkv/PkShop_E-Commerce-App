import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Sorter from './components/Slices/Sorter.jsx'
import Carter from './components/Slices/Carter.jsx'

export const store=configureStore({
  reducer:{
    nameSort:Sorter,
    nameCart:Carter
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Provider store={store}>
    <App />
     </Provider>
    </BrowserRouter>
   
  </React.StrictMode>,
)
