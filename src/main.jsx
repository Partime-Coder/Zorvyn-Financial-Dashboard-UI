import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage.jsx'
import Overview from './pages/dashboard/Overview.jsx'
import Analytics from './pages/dashboard/Analytics.jsx'
import Transaction from './pages/dashboard/Transaction.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Overview />
      },
      {
        path: "/analytics",
        element: <Analytics />
      },
      {
        path: "/transactions",
        element: <Transaction />
      },
      
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)