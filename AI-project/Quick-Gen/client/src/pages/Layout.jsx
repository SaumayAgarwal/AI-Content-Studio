import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen overflow-hidden' style={{ background: "#0A0F1E", color: "#F8F9FC" }}>

      {/* Top Navbar */}
      <nav
        className='flex items-center justify-between w-full px-6 py-4 border-b border-white/[0.07] z-50'
        style={{ background: "rgba(17,24,39,0.7)", backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <button
          className='flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0'
          onClick={() => navigate('/')}
        >
          <div
            className='w-8 h-8 rounded-[8px] flex items-center justify-center text-white font-display font-black text-xs tracking-tighter'
            style={{ background: "linear-gradient(135deg, #C9973A, #A07420)" }}
          >
            AI
          </div>
          <span className='font-display font-bold text-[1.1rem] text-white hidden sm:block'>
            Content Studio
          </span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className='sm:hidden bg-transparent border-none cursor-pointer p-1'
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar
            ? <X className='w-5 h-5 text-slate' />
            : <Menu className='w-5 h-5 text-slate' />}
        </button>
      </nav>

      {/* Layout: Sidebar + Main content */}
      <div className='flex-1 w-full flex' style={{ height: "calc(100vh - 73px)" }}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} user={user} />
        <div
          className='flex-1 overflow-y-auto p-4 sm:p-6'
          style={{ background: "#0A0F1E" }}
        >
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    /* ── Unauthenticated / Sign-in screen ── */
    <div
      className={`relative flex items-center justify-center h-screen overflow-hidden transition-colors duration-500`}
      style={{ background: isDarkMode ? "#0A0F1E" : "#F8F9FC" }}
    >
      {/* Animated blobs */}
      <div
        className="absolute top-0 -left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
        style={{ background: isDarkMode ? "rgba(201,151,58,0.35)" : "rgba(201,151,58,0.2)" }}
      />
      <div
        className="absolute bottom-0 -right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
        style={{ background: isDarkMode ? "rgba(59,139,212,0.35)" : "rgba(59,139,212,0.2)", animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
        style={{ background: isDarkMode ? "rgba(29,158,117,0.3)" : "rgba(29,158,117,0.2)", animationDelay: "4s" }}
      />

      {/* Theme toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all duration-300 z-50
          hover:scale-110 flex items-center justify-center cursor-pointer
          ${isDarkMode
            ? 'bg-white/10 border-white/20 text-goldLight hover:shadow-gold-sm'
            : 'bg-black/5 border-black/10 text-gray-800 hover:shadow-md'}`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Sign-in card */}
      <div
        className={`relative z-10 p-2 sm:p-6 md:p-8 rounded-[2rem] backdrop-blur-xl border transition-all duration-500 hover:scale-[1.01]
          ${isDarkMode
            ? 'border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            : 'border-white/40 shadow-xl'}`}
        style={{ background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)" }}
      >
        <SignIn
          appearance={{
            baseTheme: isDarkMode ? dark : undefined,
            variables: { colorPrimary: isDarkMode ? '#C9973A' : '#A07420' },
          }}
        />
      </div>
    </div>
  )
}

export default Layout