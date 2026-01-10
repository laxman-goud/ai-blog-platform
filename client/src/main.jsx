// React 18 root API
import { createRoot } from 'react-dom/client'

// Global styles (Tailwind + custom CSS)
import './index.css'

// Main App component
import App from './App.jsx'

// React Router for client-side routing
import { BrowserRouter } from 'react-router-dom'

// Global application context provider
import { AppProvider } from './context/AppContext.jsx'

// Create and render the React application
createRoot(document.getElementById('root')).render(
  // Enables routing throughout the app
  <BrowserRouter>
    {/* Provides global state such as API config and auth token */}
    <AppProvider>
      {/* Root application component */}
      <App />
    </AppProvider>
  </BrowserRouter>
)