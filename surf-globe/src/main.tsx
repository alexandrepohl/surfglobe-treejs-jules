import React from 'react' // Added React import
import ReactDOM from 'react-dom/client' // Changed to ReactDOM import
import App from './App.tsx'
// import './index.css' // We are using App.css for global styles for now
import './App.css' // Import App.css here for global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
