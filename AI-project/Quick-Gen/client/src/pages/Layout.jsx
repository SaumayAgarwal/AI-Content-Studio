import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { useTheme } from '../context/ThemeContext'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen overflow-hidden bg-background text-foreground transition-colors duration-300'>

      {/* Top Navbar */}
      <nav
        className='flex items-center justify-between w-full px-6 py-4 border-b border-border z-50 transition-colors duration-300'
        style={{ background: "var(--navy2)", opacity: 0.9, backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <button
          className='flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0'
          onClick={() => navigate('/')}
        >
          <div
            className='w-8 h-8 rounded-[8px] flex items-center justify-center text-white font-display font-black text-xs tracking-tighter bg-gold-gradient'
          >
            AI
          </div>
          <span className='font-display font-bold text-[1.1rem] text-foreground hidden sm:block'>
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
      <div className='flex-1 w-full flex overflow-hidden'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} user={user} />
        <div
          className='flex-1 overflow-y-auto p-4 sm:p-6 bg-background transition-colors duration-300'
        >
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    /* ── Unauthenticated / Sign-in screen ── */
    <div
      className='relative flex items-center justify-center h-screen overflow-hidden transition-colors duration-500 bg-background text-foreground'
    >
      {/* Animated blobs */}
      <div
        className="absolute top-0 -left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
        style={{ background: isDark ? "rgba(201,151,58,0.35)" : "rgba(201,151,58,0.2)" }}
      />
      <div
        className="absolute bottom-0 -right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"
        style={{ background: isDark ? "rgba(59,139,212,0.35)" : "rgba(59,139,212,0.2)", animationDelay: "2s" }}
      />

      {/* Sign-in card */}
      <div
        className={`relative z-10 p-2 sm:p-6 md:p-8 rounded-[2rem] backdrop-blur-xl border transition-all duration-500 hover:scale-[1.01]
          ${isDark
            ? 'border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            : 'border-black/10 shadow-xl'}`}
        style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)" }}
      >
        <SignIn
          appearance={{
            baseTheme: isDark ? dark : undefined,
            variables: { colorPrimary: isDark ? '#C9973A' : '#A07420' },
          }}
        />
      </div>
    </div>
  )
}

export default Layout