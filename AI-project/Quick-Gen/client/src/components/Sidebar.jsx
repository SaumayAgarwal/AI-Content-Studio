import React from 'react'
import { useUser, useClerk } from "@clerk/clerk-react"
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users, LogOut, UserCircle } from 'lucide-react'
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

  const plan = user?.publicMetadata?.plan === "Professional" ? "Premium" : (user?.publicMetadata?.plan || "Free")

  return (
    <div
      className={`w-64 flex flex-col justify-between items-center border-r border-white/[0.07]
        max-sm:absolute top-14 bottom-0 z-40
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
        transition-all duration-300 ease-in-out`}
      style={{ background: "rgba(17,24,39,0.5)", backdropFilter: "blur(12px)" }}
    >
      {/* User Info + Nav */}
      <div className='my-6 w-full text-center'>
        {user && (
          <>
            {/* Avatar */}
            <img
              src={user.imageUrl}
              alt="User avatar"
              className='w-14 h-14 rounded-full mx-auto ring-2 ring-gold/30'
            />
            <h1 className='mt-2 font-semibold text-white font-sans'>{user.fullName}</h1>
            {/* Plan badge */}
            <span
              className="inline-block mt-1.5 px-3 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-widest"
              style={{ background: "rgba(201,151,58,0.15)", color: "#E8B65A" }}
            >
              {plan}
            </span>

            {/* Navigation */}
            <div className='mt-5 flex flex-col gap-1 px-4'>
              {navItems.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/ai'}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-300 text-sm font-sans
                    ${isActive
                      ? 'text-white font-medium'
                      : 'text-slate hover:text-white hover:bg-white/5'
                    }`
                  }
                  style={({ isActive }) => isActive ? {
                    background: "linear-gradient(135deg, rgba(201,151,58,0.2), rgba(201,151,58,0.08))",
                    border: "1px solid rgba(201,151,58,0.3)",
                    boxShadow: "0 0 15px rgba(201,151,58,0.1)",
                  } : {}}
                >
                  <Icon className='w-4 h-4 shrink-0' />
                  <span className='whitespace-nowrap'>{label}</span>
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className='mb-6 flex flex-col gap-2.5 w-full px-6'>
        <button
          onClick={() => openUserProfile()}
          className='flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.07] bg-white/5 text-slate
            hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-sans cursor-pointer'
        >
          <UserCircle className="w-4 h-4" />
          Profile
        </button>

        <button
          onClick={() => signOut()}
          className='flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold font-sans cursor-pointer transition-all duration-200'
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#F87171" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)" }}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar
