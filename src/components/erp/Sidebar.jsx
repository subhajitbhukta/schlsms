'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Shield, Users, GraduationCap, BookOpen, UserCheck, Heart,
  ClipboardList, FileText, IndianRupee, Briefcase, Bus, Library, Building2,
  HeartPulse, MessageSquare, Brain, CreditCard, ChevronLeft, ChevronRight,
  Search, Settings, LogOut, ChevronDown, GraduationCap as SchoolIcon,
  PanelLeftClose, PanelLeft, Sparkles
} from 'lucide-react'
import useAppStore from '@/store/useAppStore'

const iconMap = {
  LayoutDashboard, Shield, Users, GraduationCap, BookOpen, UserCheck, Heart,
  ClipboardList, FileText, IndianRupee, Briefcase, Bus, Library, Building2,
  HeartPulse, MessageSquare, Brain, CreditCard,
}

const categories = [
  { id: 'main', label: 'Overview' },
  { id: 'admin', label: 'Administration' },
  { id: 'academic', label: 'Academic' },
  { id: 'campus', label: 'Campus' },
  { id: 'intelligence', label: 'Intelligence' },
]

export default function Sidebar() {
  const { activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed, navItems, currentUser, logout } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCats, setExpandedCats] = useState({
    main: true, admin: true, academic: true, campus: true, intelligence: true
  })

  const filteredItems = useMemo(() => {
    if (!searchQuery) return navItems
    return navItems.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [navItems, searchQuery])

  const groupedItems = useMemo(() => {
    const groups = {}
    categories.forEach(cat => {
      const items = filteredItems.filter(item => item.category === cat.id)
      if (items.length > 0) groups[cat.id] = { ...cat, items }
    })
    return groups
  }, [filteredItems])

  const toggleCat = (catId) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }))
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen sidebar-gradient flex flex-col border-r border-white/5 relative z-40 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-birla-gold" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="text-sm font-bold text-white leading-tight">Birla Open Minds</h1>
              <p className="text-[10px] text-birla-cyan/60 uppercase tracking-widest">ERP + LMS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-birla-gold/40 focus:border-birla-gold/40 transition-all"
            />
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 py-1 custom-scrollbar">
        {Object.entries(groupedItems).map(([catId, cat]) => (
          <div key={catId} className="mb-1">
            {!sidebarCollapsed && (
              <button
                onClick={() => toggleCat(catId)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors"
              >
                {cat.label}
                <ChevronDown className={`w-3 h-3 transition-transform ${expandedCats[catId] ? 'rotate-180' : ''}`} />
              </button>
            )}
            <AnimatePresence>
              {(expandedCats[catId] || sidebarCollapsed) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cat.items.map((item) => {
                    const Icon = iconMap[item.icon] || LayoutDashboard
                    const isActive = activeView === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 group relative ${
                          isActive
                            ? 'bg-birla-gold/15 text-birla-gold shadow-sm'
                            : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                        }`}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-birla-gold rounded-r-full"
                          />
                        )}
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-birla-gold' : ''}`} />
                        <AnimatePresence>
                          {!sidebarCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="text-sm truncate overflow-hidden whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {item.id === 'analytics' && !sidebarCollapsed && (
                          <Sparkles className="w-3 h-3 text-birla-cyan ml-auto" />
                        )}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8 p-3">
        {!sidebarCollapsed && currentUser && (
          <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full gradient-birla-gold flex items-center justify-center text-xs font-bold text-birla-blue">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-white/40 capitalize">{currentUser.role}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex-1 p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-all"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <PanelLeft className="w-4 h-4 mx-auto" /> : <PanelLeftClose className="w-4 h-4 mx-auto" />}
          </button>
          <button
            onClick={logout}
            className="flex-1 p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
