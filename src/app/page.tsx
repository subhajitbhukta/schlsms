'use client'

import { AnimatePresence, motion } from 'framer-motion'
import useAppStore from '@/store/useAppStore'
import Sidebar from '@/components/erp/Sidebar'
import Header from '@/components/erp/Header'
import LoginPage from '@/components/erp/LoginPage'
import AIAssistant from '@/components/erp/shared/AIAssistant'
import SchoolAdminDashboard from '@/components/erp/modules/SchoolAdminDashboard'
import SuperAdminPanel from '@/components/erp/modules/SuperAdminPanel'
import SISModule from '@/components/erp/modules/SISModule'
import LMSDashboard from '@/components/erp/modules/LMSDashboard'
import TeacherPortal from '@/components/erp/modules/TeacherPortal'
import TransportModule from '@/components/erp/modules/TransportModule'
import LibraryModule from '@/components/erp/modules/LibraryModule'
import HostelModule from '@/components/erp/modules/HostelModule'
import HealthModule from '@/components/erp/modules/HealthModule'
import AdmissionModule from '@/components/erp/modules/AdmissionModule'
import ExaminationModule from '@/components/erp/modules/ExaminationModule'
import StudentPortal from '@/components/erp/modules/StudentPortal'
import ParentPortal from '@/components/erp/modules/ParentPortal'
import FinanceModule from '@/components/erp/modules/FinanceModule'
import HRModule from '@/components/erp/modules/HRModule'
import CommunicationModule from '@/components/erp/modules/CommunicationModule'
import AnalyticsModule from '@/components/erp/modules/AnalyticsModule'
import IDCardsModule from '@/components/erp/modules/IDCardsModule'

const moduleMap = {
  dashboard: SchoolAdminDashboard,
  'super-admin': SuperAdminPanel,
  sis: SISModule,
  lms: LMSDashboard,
  teacher: TeacherPortal,
  student: StudentPortal,
  parent: ParentPortal,
  admission: AdmissionModule,
  examination: ExaminationModule,
  finance: FinanceModule,
  hr: HRModule,
  transport: TransportModule,
  library: LibraryModule,
  hostel: HostelModule,
  health: HealthModule,
  communication: CommunicationModule,
  analytics: AnalyticsModule,
  'id-cards': IDCardsModule,
}

const comingSoonViews = []

export default function Home() {
  const { isLoggedIn, activeView, sidebarOpen, setSidebarOpen } = useAppStore()

  if (!isLoggedIn) return <LoginPage />

  const ActiveModule = moduleMap[activeView]
  const isComingSoon = comingSoonViews.includes(activeView) && !moduleMap[activeView]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed lg:relative z-40 h-full transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {ActiveModule ? (
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveModule />
              </motion.div>
            ) : (
              <motion.div
                key="coming-soon"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-full min-h-[60vh]"
              >
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl gradient-birla flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {activeView.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Module
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    This module is currently under development. It will be available in the next update of Birla Open Minds ERP + LMS.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">NEP 2020</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">CBSE</span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium">Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}
