import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoggedInUserProvider from './contexts/LoggedInUserContext.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoggedInUserProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </LoggedInUserProvider>
  </React.StrictMode>,
)
