import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'

import {
  BrowserRouter as Router,

}from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from "react-hot-toast";


axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

//custom theme
const theme = createTheme({
  typography:{
    fontFamily:"Roboto Slab,serif",allVariants:{color:"white"},
  },
  });
  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <Router>

    <ThemeProvider theme={theme}>
      <Toaster position="top-right"/>
    <App />
    </ThemeProvider>

    </Router>
    </AuthProvider>
      
  </React.StrictMode>,
)
