"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "/logo-white.svg"
import dashboard from "/dashboard.svg"
import profile from "/profile.svg"
import booking from "/booking.svg"
import chat from "/chat.svg"
import favorite from "/favorite.svg"
import MainNav from "./navbar/Header"
import MiniNav from "./navbar/MiniNav"

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, logOut } = useAuth()

  // Navigation items: default for customers includes Favorites.
  // For service providers we only show the simplified set (as requested):
  // Dashboard, Bookings, Chat, Profile
  const navigationItems = user?.role === "service_provider"
    ? [
        { path: "/dashboard", icon: dashboard, label: "Dashboard" },
        { path: "/bookings", icon: booking, label: "Bookings" },
        { path: "/chat", icon: chat, label: "Chat" },
        { path: "/profile", icon: profile, label: "Profile" },
      ]
    : [
        { path: "/dashboard", icon: dashboard, label: "Dashboard" },
        { path: "/bookings", icon: booking, label: "Bookings" },
        { path: "/chat", icon: chat, label: "Chat" },
        { path: "/favorites", icon: favorite, label: "Favorites" },
        { path: "/profile", icon: profile, label: "Profile" },
      ]

  // Set sidebar open on LG screens, close on smaller screens
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    setSidebarOpen(mediaQuery.matches)

    const handleMediaQueryChange = (e) => {
      setSidebarOpen(e.matches)
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange)
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  // user is obtained from AuthContext; no need to read from localStorage here.

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    closeModal()
    logOut()
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FEFFF1]">
      {/* Sidebar - hidden on mobile, toggleable on tablet, always visible on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-54 bg-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:w-54 lg:shrink-0`}
      >
        <div className="flex w-full items-center justify-between h-16 px-4 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-semibold"></span>
          </Link>
          <button onClick={toggleSidebar} className="p-1 rounded-md lg:hidden hover:bg-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="w-full p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 space-x-3 rounded-lg transition-all duration-200 group ${isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center justify-center w-6 h-6">
                      <img
                        src={item.icon || "/placeholder.svg"}
                        alt=""
                        className={`transition-all duration-200 ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                          }`}
                      />
                    </div>
                    <span className={`transition-all duration-200 ${isActive ? "font-medium" : "font-normal"}`}>
                      {item.label}
                    </span>
                    {isActive && <span className="ml-auto w-1.5 h-5 bg-white rounded-full" />}
                  </Link>
                </li>
              )
            })}
          </ul>

          {user && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center p-3 space-x-3 bg-white/10 rounded-lg">
                <div className="w-10 h-10 bg-white/20 rounded-full overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-lg font-medium">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name || "User"}</p>
                  <p className="text-xs text-white/70 truncate">{user.email || ""}</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Top Navigation */}
        <header className="z-30 flex hidden lg:block items-center justify-between h-16 px-4 bg-white shadow-sm lg:px-6">
          <MainNav toggleSidebar={toggleSidebar} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 lg:p-6">
          <MiniNav toggleSidebar={toggleSidebar} />
          {children}
        </main>
      </div>

      {/* Mobile Navigation Overlay */}
      {/* <MobileNav
        isOpen={isMobileNavOpen}
        onClose={toggleMobileNav}
        navigationItems={navigationItems}
        currentPath={location.pathname}
        userData={userData}
        onLogout={openModal}
      /> */}

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm p-6 mx-4 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-medium">Confirm Logout</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to log out of your account?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
