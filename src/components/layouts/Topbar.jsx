import React from 'react'
import { useAuth } from '../../hooks/useAuthentication'
import { RxHamburgerMenu } from "../../assets/icons/reactIcons"

function Topbar({ setIsMobileOpen }) {
  const { user } = useAuth()

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">

      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden text-2xl text-text-primary"
      >
        <RxHamburgerMenu />
      </button>

      <div>
        <h1 className="text-text-primary font-semibold text-lg leading-tight">
          Welcome back, {user.name}
        </h1>
        <p className="text-text-secondary text-xs mt-0.5">
          Here is your financial overview
        </p>
      </div>
    </header>
  )
}

export default Topbar