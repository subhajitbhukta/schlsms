import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Bell, Moon, Sun, Menu, GraduationCap, Sparkles,
  X, Mic, Settings, HelpCircle, ChevronDown, LogOut, User
} from 'lucide-react'
import useAppStore from '../../store/useAppStore'

export default function Header() {
  const {
    darkMode, toggleDarkMode, currentUser, activeView, navItems,
    searchOpen, setSearchOpen, notificationOpen, setNotificationOpen,
    aiAssistantOpen, setAiAssistantOpen, notifications, logout
  } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const userMenuRef = useRef(null)

  const currentLabel = navItems.find(n => n.id === activeView)?.label || 'Dashboard'
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => useAppStore.getState().setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-semibold text-foreground">{currentLabel}</h2>
          <p className="text-[10px] text-muted-foreground hidden sm:block">
            Birla Open Minds International School, Singur
          </p>
        </div>
        <span className="hidden md:inline-flex px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-medium">
          NEP 2020
        </span>
        <span className="hidden md:inline-flex px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 text-[10px] font-medium">
          CBSE
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Search (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="p-2 rounded-lg hover:bg-birla-gold/10 transition-colors text-muted-foreground hover:text-birla-gold"
          title="AI Assistant"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <button className="text-xs text-birla-gold hover:underline">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-birla-gold/5' : ''}`}>
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border">
                  <button className="w-full text-center text-xs text-birla-gold hover:underline py-1">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-7 h-7 rounded-full gradient-birla-gold flex items-center justify-center text-xs font-bold text-birla-blue">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-11 w-52 rounded-xl bg-card border border-border shadow-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser?.role}</p>
                </div>
                <div className="p-1">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    <HelpCircle className="w-4 h-4" /> Help
                  </button>
                </div>
                <div className="border-t border-border p-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students, teachers, modules..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                  <Mic className="w-4 h-4" />
                </button>
                <button onClick={() => setSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-3">Quick Access</p>
                <div className="space-y-1">
                  {navItems.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { useAppStore.getState().setActiveView(item.id); setSearchOpen(false) }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                    >
                      <div className="w-8 h-8 rounded-lg bg-birla-gold/10 flex items-center justify-center">
                        <Search className="w-3.5 h-3.5 text-birla-gold" />
                      </div>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
