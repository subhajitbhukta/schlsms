import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, User, GraduationCap, Building2, BookOpen, Heart, ChevronRight } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

const roles = [
  { id: 'admin', label: 'Admin', icon: Building2, color: 'from-blue-900 to-blue-700' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, color: 'from-emerald-800 to-emerald-600' },
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'from-purple-800 to-purple-600' },
  { id: 'parent', label: 'Parent', icon: Heart, color: 'from-amber-800 to-amber-600' },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useAppStore((s) => s.login)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      login(selectedRole)
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] gradient-birla relative items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-birla-cyan/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-birla-gold/5 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-birla-cyan/40 rounded-full animate-float" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-birla-gold/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Area */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <GraduationCap className="w-9 h-9 text-birla-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Birla Open Minds</h1>
                <p className="text-birla-cyan/80 text-sm tracking-wider uppercase">International School</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Smart Campus<br />
              <span className="text-gradient-gold">ERP + LMS</span> Ecosystem
            </h2>
            <p className="text-blue-200/70 text-lg mb-8 leading-relaxed">
              NEP 2020 aligned &bull; CBSE compliant &bull; UDISE+ integrated<br />
              AI-powered intelligent school management platform
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {['AI Analytics', 'Smart ID Cards', 'GPS Transport', 'Virtual Classrooms', 'Competency Tracking', 'Digital Library'].map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-blue-100/80 text-xs font-medium backdrop-blur-sm"
                >
                  {f}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '2,500+', label: 'Students' },
                { value: '180+', label: 'Faculty' },
                { value: '99.2%', label: 'Attendance' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
                  <div className="text-xl font-bold text-birla-gold">{stat.value}</div>
                  <div className="text-xs text-blue-200/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-birla flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-birla-gold" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Birla Open Minds</h1>
              <p className="text-xs text-muted-foreground">International School</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to access your school ERP dashboard</p>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Select Role</label>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((role) => {
                const Icon = role.icon
                const isActive = selectedRole === role.id
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${
                      isActive
                        ? 'border-birla-gold bg-birla-gold/10 shadow-lg shadow-birla-gold/10'
                        : 'border-border hover:border-birla-gold/40 hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-birla-gold' : 'text-muted-foreground'}`} />
                    <span className={`text-xs font-medium ${isActive ? 'text-birla-gold' : 'text-muted-foreground'}`}>
                      {role.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Username / Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-input accent-birla-gold" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <button className="text-sm text-birla-gold hover:underline">Forgot password?</button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3 rounded-xl gradient-birla text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-blue-900/30"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* NEP & CBSE badges */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-medium">
              NEP 2020 Aligned
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 text-xs font-medium">
              CBSE Compliant
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 text-xs font-medium">
              UDISE+ Ready
            </span>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            &copy; 2026 Birla Open Minds International School, Singur<br />
            Powered by Smart Campus ERP v3.0
          </p>
        </motion.div>
      </div>
    </div>
  )
}
