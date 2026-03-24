import React from 'react'
import { useUser, useClerk } from "@clerk/clerk-react"
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Generate Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  const plan = user?.publicMetadata?.plan || "Free"

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center 
      max-sm:absolute top-14 bottom-0 
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
      transition-all duration-300 ease-in-out`}
    >
      {/* User Info */}
      <div className='my-6 w-full text-center'>
        {user && (
          <>
            <img
              src={user.imageUrl}
              alt="User avatar"
              className='w-14 h-14 rounded-full mx-auto'
            />
            <h1 className='mt-2 font-semibold'>{user.fullName}</h1>
            <p className="text-sm text-gray-500 mt-1">{plan.toUpperCase()}</p> {/* Display plan */}

            {/* Navigation */}
            <div className='mt-5 flex flex-col gap-1 px-4'>
              {navItems.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/ai'}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 flex items-center gap-3 rounded transition
                    ${isActive
                      ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                      : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className='w-5 h-5' />
                  {label}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className='mb-6 flex flex-col gap-3 w-full px-6'>
        <button
          onClick={() => openUserProfile()}
          className='bg-gray-100 py-2 rounded hover:bg-gray-200'
        >
          Profile
        </button>

        <button
          onClick={() => signOut()}  // fixed
          className='bg-red-500 text-white py-2 rounded hover:bg-red-600'
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar
