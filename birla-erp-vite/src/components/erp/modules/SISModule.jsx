import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Search, Plus, Eye, Edit, ChevronRight, ChevronLeft, GraduationCap, UserCheck, FileText, HeartPulse, ArrowUpRight, Clock, CheckCircle2, AlertTriangle, XCircle, Download, Upload, Phone, Mail, MapPin, Calendar, BookOpen, Award, Shield, Building2, MessageSquare, ClipboardList, IndianRupee, Activity, Printer, Send, Flag, Hash, Stethoscope, Syringe, Eye as EyeIcon, Ruler, Weight, Droplets, AlertCircle, UserX, PenTool, BarChart3, PieChart as PieChartIcon, Armchair } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '../../../store/useAppStore'
import QRStudentLookup from '../shared/QRStudentLookup'

// ─── Student Data ────────────────────────────────────────────────
const students = [
  { id: 'BOM-2025-001', name: 'Aarav Sharma', class: 'X-A', roll: 1, gender: 'Male', dob: '15 Mar 2011', house: 'Ashoka', status: 'Active', phone: '+91 98765 43210', email: 'aarav.s@parent.com', attendance: 94, fees: 'Paid', bspId: 'BSP/WB/2023/00145', penNo: 'PEN-8234-5612', upparId: 'UPPR-WB-001245' },
  { id: 'BOM-2025-002', name: 'Priya Gupta', class: 'X-A', roll: 2, gender: 'Female', dob: '22 Jun 2011', house: 'Tagore', status: 'Active', phone: '+91 87654 32109', email: 'priya.g@parent.com', attendance: 98, fees: 'Paid', bspId: 'BSP/WB/2023/00146', penNo: 'PEN-8234-5613', upparId: 'UPPR-WB-001246' },
  { id: 'BOM-2025-003', name: 'Arjun Reddy', class: 'IX-B', roll: 5, gender: 'Male', dob: '08 Jan 2012', house: 'Raman', status: 'Active', phone: '+91 76543 21098', email: 'arjun.r@parent.com', attendance: 91, fees: 'Pending', bspId: 'BSP/WB/2023/00147', penNo: 'PEN-8234-5614', upparId: '' },
  { id: 'BOM-2025-004', name: 'Ananya Iyer', class: 'VIII-A', roll: 3, gender: 'Female', dob: '14 Sep 2013', house: 'Nehru', status: 'Active', phone: '+91 65432 10987', email: 'ananya.i@parent.com', attendance: 96, fees: 'Paid', bspId: 'BSP/WB/2023/00148', penNo: '', upparId: 'UPPR-WB-001248' },
  { id: 'BOM-2025-005', name: 'Rohan Patel', class: 'VII-A', roll: 8, gender: 'Male', dob: '30 Nov 2013', house: 'Ashoka', status: 'Active', phone: '+91 54321 09876', email: 'rohan.p@parent.com', attendance: 88, fees: 'Partial', bspId: '', penNo: 'PEN-8234-5616', upparId: 'UPPR-WB-001249' },
  { id: 'BOM-2025-006', name: 'Ishita Banerjee', class: 'VI-B', roll: 12, gender: 'Female', dob: '05 Apr 2014', house: 'Tagore', status: 'Active', phone: '+91 43210 98765', email: 'ishita.b@parent.com', attendance: 95, fees: 'Paid', bspId: 'BSP/WB/2023/00150', penNo: 'PEN-8234-5617', upparId: 'UPPR-WB-001250' },
  { id: 'BOM-2025-007', name: 'Vivaan Kumar', class: 'V-A', roll: 6, gender: 'Male', dob: '19 Jul 2015', house: 'Raman', status: 'Active', phone: '+91 32109 87654', email: 'vivaan.k@parent.com', attendance: 92, fees: 'Paid', bspId: 'BSP/WB/2023/00151', penNo: '', upparId: '' },
  { id: 'BOM-2025-008', name: 'Meera Nair', class: 'IV-A', roll: 1, gender: 'Female', dob: '11 Feb 2016', house: 'Nehru', status: 'Active', phone: '+91 21098 76543', email: 'meera.n@parent.com', attendance: 97, fees: 'Paid', bspId: 'BSP/WB/2023/00152', penNo: 'PEN-8234-5619', upparId: 'UPPR-WB-001252' },
  { id: 'BOM-2025-009', name: 'Aditya Singh', class: 'III-B', roll: 4, gender: 'Male', dob: '27 Aug 2016', house: 'Ashoka', status: 'Inactive', phone: '+91 10987 65432', email: 'aditya.s@parent.com', attendance: 78, fees: 'Overdue', bspId: '', penNo: '', upparId: '' },
  { id: 'BOM-2025-010', name: 'Kavya Joshi', class: 'II-A', roll: 9, gender: 'Female', dob: '03 Dec 2017', house: 'Tagore', status: 'Active', phone: '+91 09876 54321', email: 'kavya.j@parent.com', attendance: 99, fees: 'Paid', bspId: 'BSP/WB/2023/00154', penNo: 'PEN-8234-5621', upparId: 'UPPR-WB-001254' },
]

const houses = [
  { name: 'Ashoka', color: '#EF4444', bg: 'bg-red-500', bgLight: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', motto: 'Courage & Valor', students: 640, captain: 'Vikram Malhotra' },
  { name: 'Tagore', color: '#3B82F6', bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', motto: 'Wisdom & Creativity', students: 635, captain: 'Sneha Dasgupta' },
  { name: 'Raman', color: '#10B981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', motto: 'Science & Innovation', students: 638, captain: 'Arjun Krishnan' },
  { name: 'Nehru', color: '#F59E0B', bg: 'bg-amber-500', bgLight: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', motto: 'Leadership & Service', students: 634, captain: 'Meera Choudhury' },
]

// Report data
const demographicsData = [
  { class: 'Nursery', boys: 45, girls: 42, bspCompliance: 95, penCompliance: 88, upparCompliance: 82 },
  { class: 'I-V', boys: 295, girls: 272, bspCompliance: 92, penCompliance: 80, upparCompliance: 72 },
  { class: 'VI-VIII', boys: 172, girls: 154, bspCompliance: 90, penCompliance: 76, upparCompliance: 65 },
  { class: 'IX-X', boys: 123, girls: 108, bspCompliance: 94, penCompliance: 82, upparCompliance: 70 },
  { class: 'XI-XII', boys: 92, girls: 85, bspCompliance: 88, penCompliance: 75, upparCompliance: 62 },
]

const admissionTrendsData = [
  { month: 'Jan', applications: 85, admissions: 42 },
  { month: 'Feb', applications: 120, admissions: 68 },
  { month: 'Mar', applications: 180, admissions: 95 },
  { month: 'Apr', applications: 210, admissions: 120 },
  { month: 'May', applications: 95, admissions: 55 },
  { month: 'Jun', applications: 45, admissions: 28 },
  { month: 'Jul', applications: 30, admissions: 15 },
  { month: 'Aug', applications: 20, admissions: 8 },
  { month: 'Sep', applications: 15, admissions: 5 },
  { month: 'Oct', applications: 25, admissions: 12 },
  { month: 'Nov', applications: 35, admissions: 18 },
  { month: 'Dec', applications: 50, admissions: 25 },
]

const tcReportData = [
  { reason: "Parent's Request", count: 45 },
  { reason: 'Transfer', count: 32 },
  { reason: 'Completion', count: 28 },
  { reason: 'Personal', count: 15 },
  { reason: 'Other', count: 8 },
]

const healthOverviewData = [
  { bloodGroup: 'A+', count: 580, percentage: 22.8 },
  { bloodGroup: 'B+', count: 720, percentage: 28.3 },
  { bloodGroup: 'O+', count: 640, percentage: 25.1 },
  { bloodGroup: 'AB+', count: 280, percentage: 11.0 },
  { bloodGroup: 'A-', count: 120, percentage: 4.7 },
  { bloodGroup: 'B-', count: 105, percentage: 4.1 },
  { bloodGroup: 'O-', count: 62, percentage: 2.4 },
  { bloodGroup: 'AB-', count: 40, percentage: 1.6 },
]

const houseDistributionData = [
  { name: 'Ashoka', value: 640, color: '#EF4444' },
  { name: 'Tagore', value: 635, color: '#3B82F6' },
  { name: 'Raman', value: 638, color: '#10B981' },
  { name: 'Nehru', value: 634, color: '#F59E0B' },
]

const documentComplianceData = [
  { name: 'Birth Certificate', verified: 2480, total: 2547 },
  { name: 'Aadhaar Card', verified: 2520, total: 2547 },
  { name: 'Transfer Certificate', verified: 2210, total: 2547 },
  { name: 'Previous Marksheet', verified: 2350, total: 2547 },
  { name: 'Passport Photos', verified: 2500, total: 2547 },
  { name: 'Medical Certificate', verified: 1890, total: 2547 },
  { name: 'Parent ID Proof', verified: 2460, total: 2547 },
  { name: 'Address Proof', verified: 2100, total: 2547 },
]

// ─── Animation ───────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const tooltipStyle = (darkMode) => ({
  backgroundColor: darkMode ? '#1A2D4A' : '#fff',
  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
  borderRadius: '12px',
  fontSize: '12px',
  color: darkMode ? '#e2e8f0' : '#1e293b',
})

export default function SISModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('directory')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterClass, setFilterClass] = useState('All')

  // ─── Form States ────────────────────────────────────────
  const [showAdmissionForm, setShowAdmissionForm] = useState(false)
  const [showTCForm, setShowTCForm] = useState(false)
  const [showHealthForm, setShowHealthForm] = useState(false)
  const [showDisciplineForm, setShowDisciplineForm] = useState(false)
  const [showDocVerifyForm, setShowDocVerifyForm] = useState(false)
  const [showHouseForm, setShowHouseForm] = useState(false)
  const [showParentCommForm, setShowParentCommForm] = useState(false)

  const [admissionFormData, setAdmissionFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', class: '', section: '',
    bspId: '', penNo: '', upparId: '', bloodGroup: '',
    fatherName: '', fatherOccupation: '', fatherPhone: '', fatherEmail: '',
    motherName: '', motherOccupation: '', motherPhone: '', motherEmail: '',
    previousGraduationCap: '', previousClass: '', previousTC: '', address: '', city: '', state: 'West Bengal', pincode: '',
    birthCert: false, aadhaar: false, transferCert: false, marksheet: false, photos: false, medical: false, parentID: false, addressProof: false,
  })
  const [tcFormData, setTcFormData] = useState({
    studentId: '', tcType: '', reason: '', conduct: '', issueDate: '', remarks: '',
    hindi: '', english: '', math: '', science: '', socialScience: '',
  })
  const [healthFormData, setHealthFormData] = useState({
    studentId: '', height: '', weight: '', bloodGroup: '',
    visionLeft: '', visionRight: '', hearing: 'Normal',
    allergies: '', chronicConditions: '', medications: '',
    vaccinationName: '', vaccinationDate: '', vaccinationNext: '',
  })
  const [disciplineFormData, setDisciplineFormData] = useState({
    studentId: '', incidentType: '', date: '', description: '', actionTaken: '', parentNotified: '',
  })
  const [docVerifyFormData, setDocVerifyFormData] = useState({
    studentId: '', documentType: '', verificationStatus: '', remarks: '',
  })
  const [houseFormData, setHouseFormData] = useState({
    studentId: '', house: '', isCaptain: false,
  })
  const [parentCommFormData, setParentCommFormData] = useState({
    studentId: '', parentName: '', communicationType: '', subject: '', details: '', followUpDate: '',
  })

  const tabs = [
    { id: 'directory', label: 'Student Directory', icon: Users },
    { id: 'forms', label: 'Forms & Entries', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = filterClass === 'All' || s.class === filterClass
    return matchesSearch && matchesClass
  })

  const classOptions = ['All', ...Array.from(new Set(students.map((s) => s.class))).sort()]

  const inputClass = 'w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/30'
  const labelClass = 'text-xs font-medium text-muted-foreground mb-1.5 block'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-birla text-white shadow-md'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          STUDENT DIRECTORY TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'directory' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-birla-cyan" />
              Student Directory
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{students.length} records</span>
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={() => { setActiveTab('forms'); setShowAdmissionForm(true) }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Student
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
            >
              {classOptions.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Classes' : `Class ${c}`}</option>
              ))}
            </select>
          </div>

          {/* Student Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStudents.map((student) => {
              const houseData = houses.find((h) => h.name === student.house)
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl gradient-birla-gold flex items-center justify-center text-sm font-bold text-birla-blue flex-shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{student.name}</p>
                      <p className="text-[10px] text-muted-foreground">{student.id} &bull; Class {student.class} &bull; Roll #{student.roll}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex-shrink-0 ${
                      student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  {/* UDISE+ IDs */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground w-14">BSP ID:</span>
                      <span className={`font-mono ${student.bspId ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                        {student.bspId || 'Not Assigned'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground w-14">PEN No:</span>
                      <span className={`font-mono ${student.penNo ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                        {student.penNo || 'Not Assigned'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground w-14">Uppar ID:</span>
                      <span className={`font-mono ${student.upparId ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                        {student.upparId || 'Not Assigned'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${houseData?.bgLight || 'bg-muted'} ${houseData?.text || 'text-muted-foreground'}`}>
                      {student.house}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${student.attendance}%`, backgroundColor: student.attendance >= 90 ? '#10B981' : '#F59E0B' }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{student.attendance}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected Student Profile */}
          <AnimatePresence>
            {selectedStudent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border border-border bg-card p-6 gradient-card-blue"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl gradient-birla-gold flex items-center justify-center text-xl font-bold text-birla-blue">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{selectedStudent.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedStudent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>{selectedStudent.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedStudent.id} &bull; Class {selectedStudent.class} &bull; Roll #{selectedStudent.roll} &bull; {selectedStudent.gender}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="w-3 h-3" />{selectedStudent.phone}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="w-3 h-3" />{selectedStudent.email}</span>
                    </div>
                  </div>
                </div>
                {/* UDISE+ IDs */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border border-border bg-muted/30">
                    <p className="text-[10px] text-muted-foreground mb-1">BSP ID</p>
                    <p className={`text-xs font-mono font-semibold ${selectedStudent.bspId ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {selectedStudent.bspId || 'Not Assigned'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-muted/30">
                    <p className="text-[10px] text-muted-foreground mb-1">PEN No</p>
                    <p className={`text-xs font-mono font-semibold ${selectedStudent.penNo ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {selectedStudent.penNo || 'Not Assigned'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-muted/30">
                    <p className="text-[10px] text-muted-foreground mb-1">Uppar ID</p>
                    <p className={`text-xs font-mono font-semibold ${selectedStudent.upparId ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {selectedStudent.upparId || 'Not Assigned'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Printer className="w-3.5 h-3.5" /> Print Profile</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════
          FORMS TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Form Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'admission', label: 'New Admission', icon: GraduationCap, state: showAdmissionForm, setter: setShowAdmissionForm },
              { key: 'tc', label: 'Transfer Certificate', icon: Award, state: showTCForm, setter: setShowTCForm },
              { key: 'health', label: 'Health Record', icon: HeartPulse, state: showHealthForm, setter: setShowHealthForm },
              { key: 'discipline', label: 'Discipline Record', icon: Shield, state: showDisciplineForm, setter: setShowDisciplineForm },
              { key: 'docverify', label: 'Document Verification', icon: FileText, state: showDocVerifyForm, setter: setShowDocVerifyForm },
              { key: 'house', label: 'House Allocation', icon: Flag, state: showHouseForm, setter: setShowHouseForm },
              { key: 'parentcomm', label: 'Parent Communication', icon: MessageSquare, state: showParentCommForm, setter: setShowParentCommForm },
            ].map((f) => {
              const Icon = f.icon
              return (
                <button
                  key={f.key}
                  onClick={() => f.setter(!f.state)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    f.state ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* ─── New Student Admission Form ──────────────────── */}
          {showAdmissionForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-birla-cyan" /> New Student Admission Form
              </h3>
              <div className="space-y-4">
                {/* Personal Info */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-birla-gold" /> Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div><label className={labelClass}>First Name</label><input type="text" value={admissionFormData.firstName} onChange={(e) => setAdmissionFormData({...admissionFormData, firstName: e.target.value})} className={inputClass} placeholder="Enter first name" /></div>
                    <div><label className={labelClass}>Last Name</label><input type="text" value={admissionFormData.lastName} onChange={(e) => setAdmissionFormData({...admissionFormData, lastName: e.target.value})} className={inputClass} placeholder="Enter last name" /></div>
                    <div><label className={labelClass}>Date of Birth</label><input type="date" value={admissionFormData.dob} onChange={(e) => setAdmissionFormData({...admissionFormData, dob: e.target.value})} className={inputClass} /></div>
                    <div><label className={labelClass}>Gender</label><select value={admissionFormData.gender} onChange={(e) => setAdmissionFormData({...admissionFormData, gender: e.target.value})} className={inputClass}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                    <div><label className={labelClass}>Class</label><select value={admissionFormData.class} onChange={(e) => setAdmissionFormData({...admissionFormData, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{['Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                    <div><label className={labelClass}>Section</label><select value={admissionFormData.section} onChange={(e) => setAdmissionFormData({...admissionFormData, section: e.target.value})} className={inputClass}><option value="">Select</option><option>A</option><option>B</option><option>C</option></select></div>
                    <div><label className={labelClass}>BSP ID</label><input type="text" value={admissionFormData.bspId} onChange={(e) => setAdmissionFormData({...admissionFormData, bspId: e.target.value})} className={inputClass} placeholder="BSP/WB/2023/XXXXX" /></div>
                    <div><label className={labelClass}>PEN No</label><input type="text" value={admissionFormData.penNo} onChange={(e) => setAdmissionFormData({...admissionFormData, penNo: e.target.value})} className={inputClass} placeholder="PEN-XXXX-XXXX" /></div>
                    <div><label className={labelClass}>Uppar ID</label><input type="text" value={admissionFormData.upparId} onChange={(e) => setAdmissionFormData({...admissionFormData, upparId: e.target.value})} className={inputClass} placeholder="UPPR-WB-XXXXXX" /></div>
                    <div><label className={labelClass}>Blood Group</label><select value={admissionFormData.bloodGroup} onChange={(e) => setAdmissionFormData({...admissionFormData, bloodGroup: e.target.value})} className={inputClass}><option value="">Select</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}</select></div>
                  </div>
                </div>
                {/* Parent Details */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><HeartPulse className="w-4 h-4 text-birla-gold" /> Parent Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div><label className={labelClass}>Father&apos;s Name</label><input type="text" value={admissionFormData.fatherName} onChange={(e) => setAdmissionFormData({...admissionFormData, fatherName: e.target.value})} className={inputClass} placeholder="Father's name" /></div>
                    <div><label className={labelClass}>Father&apos;s Occupation</label><input type="text" value={admissionFormData.fatherOccupation} onChange={(e) => setAdmissionFormData({...admissionFormData, fatherOccupation: e.target.value})} className={inputClass} placeholder="Occupation" /></div>
                    <div><label className={labelClass}>Father&apos;s Phone</label><input type="tel" value={admissionFormData.fatherPhone} onChange={(e) => setAdmissionFormData({...admissionFormData, fatherPhone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                    <div><label className={labelClass}>Father&apos;s Email</label><input type="email" value={admissionFormData.fatherEmail} onChange={(e) => setAdmissionFormData({...admissionFormData, fatherEmail: e.target.value})} className={inputClass} placeholder="email@example.com" /></div>
                    <div><label className={labelClass}>Mother&apos;s Name</label><input type="text" value={admissionFormData.motherName} onChange={(e) => setAdmissionFormData({...admissionFormData, motherName: e.target.value})} className={inputClass} placeholder="Mother's name" /></div>
                    <div><label className={labelClass}>Mother&apos;s Occupation</label><input type="text" value={admissionFormData.motherOccupation} onChange={(e) => setAdmissionFormData({...admissionFormData, motherOccupation: e.target.value})} className={inputClass} placeholder="Occupation" /></div>
                    <div><label className={labelClass}>Mother&apos;s Phone</label><input type="tel" value={admissionFormData.motherPhone} onChange={(e) => setAdmissionFormData({...admissionFormData, motherPhone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                    <div><label className={labelClass}>Mother&apos;s Email</label><input type="email" value={admissionFormData.motherEmail} onChange={(e) => setAdmissionFormData({...admissionFormData, motherEmail: e.target.value})} className={inputClass} placeholder="email@example.com" /></div>
                  </div>
                </div>
                {/* Previous GraduationCap */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-birla-gold" /> Previous GraduationCap</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelClass}>Previous GraduationCap Name</label><input type="text" value={admissionFormData.previousGraduationCap} onChange={(e) => setAdmissionFormData({...admissionFormData, previousGraduationCap: e.target.value})} className={inputClass} placeholder="Previous school name" /></div>
                    <div><label className={labelClass}>Previous Class</label><input type="text" value={admissionFormData.previousClass} onChange={(e) => setAdmissionFormData({...admissionFormData, previousClass: e.target.value})} className={inputClass} placeholder="Last attended class" /></div>
                    <div><label className={labelClass}>TC Number</label><input type="text" value={admissionFormData.previousTC} onChange={(e) => setAdmissionFormData({...admissionFormData, previousTC: e.target.value})} className={inputClass} placeholder="Transfer Certificate No." /></div>
                  </div>
                </div>
                {/* Address */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-birla-gold" /> Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2"><label className={labelClass}>Full Address</label><input type="text" value={admissionFormData.address} onChange={(e) => setAdmissionFormData({...admissionFormData, address: e.target.value})} className={inputClass} placeholder="Street address" /></div>
                    <div><label className={labelClass}>City</label><input type="text" value={admissionFormData.city} onChange={(e) => setAdmissionFormData({...admissionFormData, city: e.target.value})} className={inputClass} placeholder="City" /></div>
                    <div><label className={labelClass}>Pincode</label><input type="text" value={admissionFormData.pincode} onChange={(e) => setAdmissionFormData({...admissionFormData, pincode: e.target.value})} className={inputClass} placeholder="712XXX" /></div>
                  </div>
                </div>
                {/* Documents Checklist */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-birla-gold" /> Documents Checklist</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'birthCert', label: 'Birth Certificate' },
                      { key: 'aadhaar', label: 'Aadhaar Card' },
                      { key: 'transferCert', label: 'Transfer Certificate' },
                      { key: 'marksheet', label: 'Previous Marksheet' },
                      { key: 'photos', label: 'Passport Photos (4)' },
                      { key: 'medical', label: 'Medical Certificate' },
                      { key: 'parentID', label: 'Parent ID Proof' },
                      { key: 'addressProof', label: 'Address Proof' },
                    ].map((doc) => (
                      <label key={doc.key} className="flex items-center gap-2 p-2.5 rounded-xl border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={admissionFormData[doc.key]}
                          onChange={(e) => setAdmissionFormData({...admissionFormData, [doc.key]: e.target.checked})}
                          className="w-4 h-4 rounded border-border text-birla-gold focus:ring-birla-gold/30"
                        />
                        <span className="text-xs text-foreground">{doc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Student Admission submitted successfully!'); setShowAdmissionForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Submit Admission</button>
                <button onClick={() => setShowAdmissionForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── Transfer Certificate Form ───────────────────── */}
          {showTCForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-birla-gold" /> Transfer Certificate Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Student</label><select value={tcFormData.studentId} onChange={(e) => setTcFormData({...tcFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}</select></div>
                <div><label className={labelClass}>TC Type</label><select value={tcFormData.tcType} onChange={(e) => setTcFormData({...tcFormData, tcType: e.target.value})} className={inputClass}><option value="">Select Type</option><option>Regular</option><option>Duplicate</option><option>Emergency</option></select></div>
                <div><label className={labelClass}>Reason for Leaving</label><select value={tcFormData.reason} onChange={(e) => setTcFormData({...tcFormData, reason: e.target.value})} className={inputClass}><option value="">Select Reason</option><option>Parent&apos;s Request</option><option>Transfer</option><option>Completion of Study</option><option>Personal Reasons</option><option>Disciplinary</option><option>Other</option></select></div>
                <div><label className={labelClass}>Conduct & Character</label><select value={tcFormData.conduct} onChange={(e) => setTcFormData({...tcFormData, conduct: e.target.value})} className={inputClass}><option value="">Select</option><option>Excellent</option><option>Good</option><option>Satisfactory</option><option>Average</option></select></div>
                <div><label className={labelClass}>Issue Date</label><input type="date" value={tcFormData.issueDate} onChange={(e) => setTcFormData({...tcFormData, issueDate: e.target.value})} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Remarks</label><textarea rows={2} value={tcFormData.remarks} onChange={(e) => setTcFormData({...tcFormData, remarks: e.target.value})} className={`${inputClass} resize-none`} placeholder="Additional remarks..." /></div>
              </div>
              <h4 className="text-sm font-semibold text-foreground mt-4 mb-3">Marks Details (if applicable)</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div><label className={labelClass}>Hindi</label><input type="text" value={tcFormData.hindi} onChange={(e) => setTcFormData({...tcFormData, hindi: e.target.value})} className={inputClass} placeholder="Marks" /></div>
                <div><label className={labelClass}>English</label><input type="text" value={tcFormData.english} onChange={(e) => setTcFormData({...tcFormData, english: e.target.value})} className={inputClass} placeholder="Marks" /></div>
                <div><label className={labelClass}>Mathematics</label><input type="text" value={tcFormData.math} onChange={(e) => setTcFormData({...tcFormData, math: e.target.value})} className={inputClass} placeholder="Marks" /></div>
                <div><label className={labelClass}>Science</label><input type="text" value={tcFormData.science} onChange={(e) => setTcFormData({...tcFormData, science: e.target.value})} className={inputClass} placeholder="Marks" /></div>
                <div><label className={labelClass}>Social Science</label><input type="text" value={tcFormData.socialScience} onChange={(e) => setTcFormData({...tcFormData, socialScience: e.target.value})} className={inputClass} placeholder="Marks" /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Transfer Certificate generated successfully!'); setShowTCForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium flex items-center gap-1.5"><Printer className="w-4 h-4" /> Generate TC</button>
                <button onClick={() => setShowTCForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── Health Record Form ──────────────────────────── */}
          {showHealthForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-red-500" /> Health Record Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Student</label><select value={healthFormData.studentId} onChange={(e) => setHealthFormData({...healthFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}</select></div>
                <div><label className={labelClass}>Height (cm)</label><input type="number" value={healthFormData.height} onChange={(e) => setHealthFormData({...healthFormData, height: e.target.value})} className={inputClass} placeholder="e.g. 145" /></div>
                <div><label className={labelClass}>Weight (kg)</label><input type="number" value={healthFormData.weight} onChange={(e) => setHealthFormData({...healthFormData, weight: e.target.value})} className={inputClass} placeholder="e.g. 38" /></div>
                <div><label className={labelClass}>Blood Group</label><select value={healthFormData.bloodGroup} onChange={(e) => setHealthFormData({...healthFormData, bloodGroup: e.target.value})} className={inputClass}><option value="">Select</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}</select></div>
                <div><label className={labelClass}>Vision (Left Eye)</label><input type="text" value={healthFormData.visionLeft} onChange={(e) => setHealthFormData({...healthFormData, visionLeft: e.target.value})} className={inputClass} placeholder="e.g. 6/6" /></div>
                <div><label className={labelClass}>Vision (Right Eye)</label><input type="text" value={healthFormData.visionRight} onChange={(e) => setHealthFormData({...healthFormData, visionRight: e.target.value})} className={inputClass} placeholder="e.g. 6/6" /></div>
                <div><label className={labelClass}>Hearing</label><select value={healthFormData.hearing} onChange={(e) => setHealthFormData({...healthFormData, hearing: e.target.value})} className={inputClass}><option>Normal</option><option>Mild Loss</option><option>Moderate Loss</option></select></div>
                <div><label className={labelClass}>Allergies</label><input type="text" value={healthFormData.allergies} onChange={(e) => setHealthFormData({...healthFormData, allergies: e.target.value})} className={inputClass} placeholder="e.g. Dust, Penicillin" /></div>
                <div><label className={labelClass}>Chronic Conditions</label><input type="text" value={healthFormData.chronicConditions} onChange={(e) => setHealthFormData({...healthFormData, chronicConditions: e.target.value})} className={inputClass} placeholder="e.g. Asthma, Diabetes" /></div>
                <div><label className={labelClass}>Current Medications</label><input type="text" value={healthFormData.medications} onChange={(e) => setHealthFormData({...healthFormData, medications: e.target.value})} className={inputClass} placeholder="List medications" /></div>
              </div>
              <h4 className="text-sm font-semibold text-foreground mt-4 mb-3 flex items-center gap-2"><Syringe className="w-4 h-4 text-emerald-500" /> Vaccination Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className={labelClass}>Vaccination Name</label><input type="text" value={healthFormData.vaccinationName} onChange={(e) => setHealthFormData({...healthFormData, vaccinationName: e.target.value})} className={inputClass} placeholder="e.g. COVID-19 Booster" /></div>
                <div><label className={labelClass}>Date Administered</label><input type="date" value={healthFormData.vaccinationDate} onChange={(e) => setHealthFormData({...healthFormData, vaccinationDate: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Next Due Date</label><input type="date" value={healthFormData.vaccinationNext} onChange={(e) => setHealthFormData({...healthFormData, vaccinationNext: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Health Record saved successfully!'); setShowHealthForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Health Record</button>
                <button onClick={() => setShowHealthForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── Discipline Record Form ──────────────────────── */}
          {showDisciplineForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" /> Discipline Record Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student</label><select value={disciplineFormData.studentId} onChange={(e) => setDisciplineFormData({...disciplineFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.class})</option>)}</select></div>
                <div><label className={labelClass}>Incident Type</label><select value={disciplineFormData.incidentType} onChange={(e) => setDisciplineFormData({...disciplineFormData, incidentType: e.target.value})} className={inputClass}><option value="">Select Type</option><option>Late Arrival</option><option>Uniform Violation</option><option>Homework Incomplete</option><option>Bullying</option><option>Truancy</option><option>Excellence Award</option><option>Other</option></select></div>
                <div><label className={labelClass}>Date of Incident</label><input type="date" value={disciplineFormData.date} onChange={(e) => setDisciplineFormData({...disciplineFormData, date: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Action Taken</label><select value={disciplineFormData.actionTaken} onChange={(e) => setDisciplineFormData({...disciplineFormData, actionTaken: e.target.value})} className={inputClass}><option value="">Select Action</option><option>Verbal Warning</option><option>Written Warning</option><option>Counseling</option><option>Parent Meeting</option><option>Suspension</option><option>Certificate</option><option>Medal/Award</option></select></div>
                <div className="md:col-span-2"><label className={labelClass}>Incident Description</label><textarea rows={3} value={disciplineFormData.description} onChange={(e) => setDisciplineFormData({...disciplineFormData, description: e.target.value})} className={`${inputClass} resize-none`} placeholder="Describe the incident in detail..." /></div>
                <div><label className={labelClass}>Parent Notified</label><select value={disciplineFormData.parentNotified} onChange={(e) => setDisciplineFormData({...disciplineFormData, parentNotified: e.target.value})} className={inputClass}><option value="">Select</option><option>Yes - Phone Call</option><option>Yes - SMS</option><option>Yes - Email</option><option>Yes - In Person</option><option>No</option></select></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Discipline Record submitted successfully!'); setShowDisciplineForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Submit Record</button>
                <button onClick={() => setShowDisciplineForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── Document Verification Form ──────────────────── */}
          {showDocVerifyForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" /> Document Verification Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student</label><select value={docVerifyFormData.studentId} onChange={(e) => setDocVerifyFormData({...docVerifyFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}</select></div>
                <div><label className={labelClass}>Document Type</label><select value={docVerifyFormData.documentType} onChange={(e) => setDocVerifyFormData({...docVerifyFormData, documentType: e.target.value})} className={inputClass}><option value="">Select Document</option><option>Birth Certificate</option><option>Aadhaar Card</option><option>Transfer Certificate</option><option>Previous Marksheet</option><option>Passport Photos</option><option>Medical Certificate</option><option>Parent ID Proof</option><option>Address Proof</option><option>Caste Certificate</option><option>Income Certificate</option></select></div>
                <div><label className={labelClass}>Verification Status</label><select value={docVerifyFormData.verificationStatus} onChange={(e) => setDocVerifyFormData({...docVerifyFormData, verificationStatus: e.target.value})} className={inputClass}><option value="">Select Status</option><option>Verified</option><option>Pending</option><option>Rejected</option><option>Not Applicable</option></select></div>
                <div><label className={labelClass}>Remarks</label><input type="text" value={docVerifyFormData.remarks} onChange={(e) => setDocVerifyFormData({...docVerifyFormData, remarks: e.target.value})} className={inputClass} placeholder="Verification remarks..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Document Verification updated successfully!'); setShowDocVerifyForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Update Verification</button>
                <button onClick={() => setShowDocVerifyForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── House Allocation Form ────────────────────────── */}
          {showHouseForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-500" /> House Allocation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student</label><select value={houseFormData.studentId} onChange={(e) => setHouseFormData({...houseFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.class})</option>)}</select></div>
                <div><label className={labelClass}>House</label><select value={houseFormData.house} onChange={(e) => setHouseFormData({...houseFormData, house: e.target.value})} className={inputClass}><option value="">Select House</option>{houses.map((h) => <option key={h.name} value={h.name}>{h.name} - &quot;{h.motto}&quot;</option>)}</select></div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      checked={houseFormData.isCaptain}
                      onChange={(e) => setHouseFormData({...houseFormData, isCaptain: e.target.checked})}
                      className="w-4 h-4 rounded border-border text-birla-gold focus:ring-birla-gold/30"
                    />
                    <span className="text-sm text-foreground">Nominate as House Captain</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('House Allocation saved successfully!'); setShowHouseForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Allocate House</button>
                <button onClick={() => setShowHouseForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── Parent Communication Log Form ───────────────── */}
          {showParentCommForm && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" /> Parent Communication Log
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student</label><select value={parentCommFormData.studentId} onChange={(e) => setParentCommFormData({...parentCommFormData, studentId: e.target.value})} className={inputClass}><option value="">Select Student</option>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                <div><label className={labelClass}>Parent Name</label><input type="text" value={parentCommFormData.parentName} onChange={(e) => setParentCommFormData({...parentCommFormData, parentName: e.target.value})} className={inputClass} placeholder="Parent's name" /></div>
                <div><label className={labelClass}>Communication Type</label><select value={parentCommFormData.communicationType} onChange={(e) => setParentCommFormData({...parentCommFormData, communicationType: e.target.value})} className={inputClass}><option value="">Select Type</option><option>Phone Call</option><option>SMS</option><option>Email</option><option>App Notification</option><option>In Person</option><option>Video Call</option></select></div>
                <div><label className={labelClass}>Subject</label><input type="text" value={parentCommFormData.subject} onChange={(e) => setParentCommFormData({...parentCommFormData, subject: e.target.value})} className={inputClass} placeholder="Communication subject" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Details</label><textarea rows={3} value={parentCommFormData.details} onChange={(e) => setParentCommFormData({...parentCommFormData, details: e.target.value})} className={`${inputClass} resize-none`} placeholder="Communication details..." /></div>
                <div><label className={labelClass}>Follow-up Date</label><input type="date" value={parentCommFormData.followUpDate} onChange={(e) => setParentCommFormData({...parentCommFormData, followUpDate: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { alert('Communication logged successfully!'); setShowParentCommForm(false) }} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium flex items-center gap-1.5"><Send className="w-4 h-4" /> Log Communication</button>
                <button onClick={() => setShowParentCommForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════
          REPORTS TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* ─── Student Demographics Report ────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-birla-cyan" />
                  Student Demographics Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Class-wise, gender-wise distribution with BSP/PEN/Uppar compliance</p>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted"><Download className="w-3 h-3" /> Export</button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicsData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle(darkMode)} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="boys" fill="#1A2D4A" radius={[3, 3, 0, 0]} name="Boys" />
                  <Bar dataKey="girls" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Girls" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Compliance rates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {[
                { label: 'BSP ID Compliance', data: demographicsData, key: 'bspCompliance', color: '#22D3EE' },
                { label: 'PEN No Compliance', data: demographicsData, key: 'penCompliance', color: '#C8A45C' },
                { label: 'Uppar ID Compliance', data: demographicsData, key: 'upparCompliance', color: '#8B5CF6' },
              ].map((comp) => (
                <div key={comp.label} className="p-3 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">{comp.label}</span>
                    <span className="text-xs font-bold" style={{ color: comp.color }}>
                      {Math.round(comp.data.reduce((a, b) => a + b[comp.key], 0) / comp.data.length)}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    {comp.data.map((d) => (
                      <div key={d.class} className="flex items-center gap-2">
                        <span className="text-[9px] text-muted-foreground w-10">{d.class}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d[comp.key]}%`, backgroundColor: comp.color }} />
                        </div>
                        <span className="text-[9px] text-muted-foreground">{d[comp.key]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Admission Trends Report ────────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-birla-gold" />
                  Admission Trends Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly applications vs admissions</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={admissionTrendsData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle(darkMode)} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="applications" fill="#1A2D4A" radius={[3, 3, 0, 0]} name="Applications" />
                  <Bar dataKey="admissions" fill="#C8A45C" radius={[3, 3, 0, 0]} name="Admissions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ─── Transfer Certificate Report ────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Transfer Certificate Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Yearly TCs issued by reason</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tcReportData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="reason" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle(darkMode)} />
                  <Bar dataKey="count" fill="#C8A45C" radius={[4, 4, 0, 0]} name="TCs Issued" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ─── Health Overview Report ─────────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-red-500" />
                  Health Overview Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Blood group distribution across students</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthOverviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="bloodGroup" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Allergy Statistics</h4>
                {[
                  { allergy: 'Dust Allergy', count: 320, pct: 12.6 },
                  { allergy: 'Food Allergy', count: 185, pct: 7.3 },
                  { allergy: 'Skin Allergy', count: 142, pct: 5.6 },
                  { allergy: 'Respiratory', count: 98, pct: 3.8 },
                  { allergy: 'Drug Allergy', count: 45, pct: 1.8 },
                ].map((a) => (
                  <div key={a.allergy} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <span className="text-sm text-foreground">{a.allergy}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{a.count} ({a.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Document Compliance Report ─────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Document Compliance Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Verification status across all students</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                {Math.round(documentComplianceData.reduce((a, d) => a + (d.verified / d.total), 0) / documentComplianceData.length * 100)}% Average
              </span>
            </div>
            <div className="space-y-3">
              {documentComplianceData.map((doc) => {
                const pct = Math.round((doc.verified / doc.total) * 100)
                return (
                  <div key={doc.name} className="p-3 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{doc.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{doc.verified.toLocaleString()} / {doc.total.toLocaleString()}</span>
                        <span className={`text-xs font-semibold ${pct >= 90 ? 'text-emerald-500' : pct >= 70 ? 'text-amber-500' : 'text-red-500'}`}>{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: pct >= 90 ? 'linear-gradient(90deg, #10B981, #22D3EE)' : pct >= 70 ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)' : 'linear-gradient(90deg, #EF4444, #F59E0B)' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* ─── House Distribution Report ──────────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Flag className="w-4 h-4 text-amber-500" />
                  House Distribution Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Student count per house</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={houseDistributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                      {houseDistributionData.map((entry, idx) => <Cell key={idx} fill={entry.color} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {houses.map((h) => (
                  <div key={h.name} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:shadow-sm transition-all">
                    <div className={`w-10 h-10 rounded-xl ${h.bg} text-white flex items-center justify-center text-sm font-bold`}>{h.name.charAt(0)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{h.name}</p>
                      <p className="text-[10px] text-muted-foreground">{h.motto}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{h.students}</p>
                      <p className="text-[10px] text-muted-foreground">Captain: {h.captain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
