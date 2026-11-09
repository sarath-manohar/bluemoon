import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fredoka'
import '@fontsource-variable/plus-jakarta-sans'
import './index.css'
import App from './App.jsx'
import { logoUrl } from './lib/assets.js'

// Browser-tab icon follows src/assets/logo/logo.*
if (logoUrl) {
  const icon = document.querySelector('link[rel="icon"]')
  icon?.removeAttribute('type')
  icon?.setAttribute('href', logoUrl)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
