import React, { useState, useEffect } from 'react'
import Logo from '../utilities/Logo'
import ProfileCard from '../cards/ProfileCard'
import { NavLink } from 'react-router-dom'
import {
  RxDashboard,
  IoIosArrowDown,
  IoIosArrowUp,
  GoHome,
  GrTransaction,
  IoAnalyticsSharp,
} from "../../assets/icons/reactIcons"

function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // ✅ Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileOpen])

  const navItems = [
    { name: "Overview", path: "/", icon: GoHome },
    { name: "Analytics", path: "/analytics", icon: IoAnalyticsSharp },
    { name: "Transactions", path: "/transactions", icon: GrTransaction },
  ]

  return (
    <>
      {/* ✅ Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          ${isMobile ? 'w-72' : isCollapsed ? 'w-20' : 'w-72'}
          bg-secondary
          text-text-primary
          flex flex-col items-center
          transition-all duration-300
          transform
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* ✅ Close button (mobile) */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="w-[95%] px-5 pt-5 pb-7 text-3xl text-center">
          <Logo />
        </div>

        {/* ✅ Collapse button (desktop only) */}
        {!isMobile && (
          <div
            className={`w-[95%] px-3 pb-4 ${
              isCollapsed ? "flex justify-center" : "flex justify-start"
            }`}
          >
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {isCollapsed ? ">>" : "<< Collapse"}
            </button>
          </div>
        )}

        <div className="w-[95%] flex-1 flex flex-col justify-between">
          <div>
            {/* Dashboard Header */}
            <button
              onClick={() => {
                if (!isCollapsed || isMobile) {
                  setIsDashboardOpen(!isDashboardOpen)
                }
              }}
              className={`
                w-full
                ${
                  isCollapsed && !isMobile
                    ? 'flex justify-center pb-2'
                    : 'flex justify-between items-center border-b border-third pb-2'
                }
                cursor-pointer
              `}
            >
              <div
                className={`${
                  isCollapsed && !isMobile ? '' : 'flex items-center gap-2'
                }`}
              >
                <RxDashboard size={25} />
                {(!isCollapsed || isMobile) && <span>Dashboard</span>}
              </div>

              {(!isCollapsed || isMobile) && (
                isDashboardOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
              )}
            </button>

            {/* Expanded Nav */}
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  (!isCollapsed || isMobile) && isDashboardOpen
                    ? "max-h-96 opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `
                          flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary text-text-primary'
                              : 'hover:bg-primary'
                          }
                        `
                      }
                    >
                      <Icon size={22} />
                      <span>{item.name}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            {/* Collapsed Nav (desktop only) */}
            {!isMobile && isCollapsed && (
              <nav className="flex flex-col gap-3 pt-3 items-center">
                {navItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `
                          p-3 rounded-xl transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary'
                              : 'hover:bg-primary'
                          }
                        `
                      }
                    >
                      <Icon size={22} />
                    </NavLink>
                  )
                })}
              </nav>
            )}
          </div>

          {/* Profile */}
          <div className="pb-4">
            <ProfileCard isCollapsed={!isMobile && isCollapsed} />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar