import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Bottombar, Sidebar, Topbar } from './components'
import { useAuth } from './hooks/useAuthentication'
import { useTransactions } from './hooks/useTransaction'
import { useSelector } from 'react-redux'

function App() {
  const { user, isAuthenticated, restoreSession } = useAuth()
  const navigate = useNavigate()
  const isDark = useSelector((state) => state.theme.theme)

 
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const session = restoreSession()
    if (!session) navigate("/login")
  }, [navigate])

  useTransactions()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  if (!isAuthenticated || !user) return null

  return (
    <div className='flex h-screen overflow-hidden bg-primary'>
      
     
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      <div className='flex-1 h-screen overflow-y-auto'>
        
        
        <Topbar setIsMobileOpen={setIsMobileOpen} />

        <main className='p-6'>
          <Outlet />
        </main>
        <Bottombar/>
      </div>
    </div>
  )
}

export default App