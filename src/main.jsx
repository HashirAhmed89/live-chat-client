import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets copy/css/bootstrap.min.css'
import './assets copy/vendors/css/vendors.min.css'
import './assets copy/css/theme.min.css'
import './assets copy/vendors/js/jquery.min.js'
import './assets copy/vendors/js/bootstrap.min.js'
import './assets copy/vendors/js/full-screen-helper.min.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
