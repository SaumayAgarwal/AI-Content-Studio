import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>

      {/* Navbar */}
      <nav className='flex items-center justify-between w-full px-6 py-4 border-b'>

        {/* Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className='w-32 cursor-pointer'
          onClick={() => navigate('/')}
        />

        {/* Mobile Menu Toggle */}
        {sidebar ? (
          <X
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
            onClick={() => setSidebar(true)}
          />
        )}

      </nav>

      {/* Layout: Sidebar + Main */}
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} user={user} />
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout;