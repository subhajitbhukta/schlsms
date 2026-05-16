'use client'

import { useState, useCallback } from 'react'
import { QrCode, ScanLine, Search, X, User, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Shared mock student database for QR/ID lookup
export const STUDENT_DB = [
  { id: 'STU001', name: 'Aarav Sharma', bspId: 'BSP/WB/2023/00001', penNo: 'PEN-2301-0001', upparId: 'UPPR-WB-000001', class: 'X', section: 'A', rollNo: 1, bloodGroup: 'B+', photo: true, route: 'R-01 Singur', hostel: null, parentPhone: '+91 98765 43210' },
  { id: 'STU002', name: 'Diya Patel', bspId: 'BSP/WB/2023/00002', penNo: 'PEN-2301-0002', upparId: 'UPPR-WB-000002', class: 'X', section: 'A', rollNo: 2, bloodGroup: 'O+', photo: true, route: 'R-02 Chandannagar', hostel: null, parentPhone: '+91 76543 21098' },
  { id: 'STU003', name: 'Arjun Reddy', bspId: 'BSP/WB/2023/00003', penNo: 'PEN-2301-0003', upparId: 'UPPR-WB-000003', class: 'X', section: 'A', rollNo: 3, bloodGroup: 'A+', photo: true, route: 'R-03 Srirampore', hostel: 'Boys Hostel', parentPhone: '+91 54321 09876' },
  { id: 'STU004', name: 'Ananya Gupta', bspId: 'BSP/WB/2023/00004', penNo: 'PEN-2301-0004', upparId: 'UPPR-WB-000004', class: 'X', section: 'B', rollNo: 1, bloodGroup: 'AB+', photo: true, route: null, hostel: null, parentPhone: '+91 21098 76543' },
  { id: 'STU005', name: 'Vivaan Joshi', bspId: 'BSP/WB/2023/00005', penNo: 'PEN-2301-0005', upparId: 'UPPR-WB-000005', class: 'IX', section: 'A', rollNo: 1, bloodGroup: 'B-', photo: true, route: 'R-01 Singur', hostel: null, parentPhone: '+91 09876 54321' },
  { id: 'STU006', name: 'Ishita Nair', bspId: 'BSP/WB/2023/00006', penNo: 'PEN-2301-0006', upparId: 'UPPR-WB-000006', class: 'IX', section: 'A', rollNo: 2, bloodGroup: 'O-', photo: true, route: 'R-04 Hooghly', hostel: 'Girls Hostel', parentPhone: '+91 43210 98765' },
  { id: 'STU007', name: 'Kabir Malhotra', bspId: 'BSP/WB/2023/00007', penNo: 'PEN-2301-0007', upparId: 'UPPR-WB-000007', class: 'IX', section: 'B', rollNo: 1, bloodGroup: 'A-', photo: true, route: 'R-05 Bardhaman', hostel: null, parentPhone: '+91 67890 12345' },
  { id: 'STU008', name: 'Saanvi Rao', bspId: 'BSP/WB/2023/00008', penNo: 'PEN-2301-0008', upparId: 'UPPR-WB-000008', class: 'VIII', section: 'A', rollNo: 1, bloodGroup: 'B+', photo: true, route: 'R-06 Tarakeswar', hostel: null, parentPhone: '+91 12345 67890' },
  { id: 'STU009', name: 'Rohan Singh', bspId: 'BSP/WB/2023/00009', penNo: 'PEN-2301-0009', upparId: 'UPPR-WB-000009', class: 'VIII', section: 'A', rollNo: 2, bloodGroup: 'O+', photo: false, route: 'R-01 Singur', hostel: null, parentPhone: '+91 23456 78901' },
  { id: 'STU010', name: 'Priya Menon', bspId: 'BSP/WB/2023/00010', penNo: 'PEN-2301-0010', upparId: 'UPPR-WB-000010', class: 'VII', section: 'A', rollNo: 1, bloodGroup: 'AB-', photo: true, route: null, hostel: null, parentPhone: '+91 34567 89012' },
  { id: 'STU011', name: 'Kavya Iyer', bspId: 'BSP/WB/2023/00011', penNo: 'PEN-2301-0011', upparId: 'UPPR-WB-000011', class: 'X', section: 'A', rollNo: 4, bloodGroup: 'A+', photo: true, route: 'R-03 Srirampore', hostel: null, parentPhone: '+91 45678 90123' },
  { id: 'STU012', name: 'Meera Patel', bspId: 'BSP/WB/2023/00012', penNo: 'PEN-2301-0012', upparId: 'UPPR-WB-000012', class: 'IX', section: 'A', rollNo: 3, bloodGroup: 'B+', photo: true, route: 'R-02 Chandannagar', hostel: null, parentPhone: '+91 56789 01234' },
]

// Teacher/Staff database for QR/ID lookup
export const TEACHER_DB = [
  { id: 'TCH001', name: 'Dr. Priya Menon', empId: 'EMP-001', department: 'Science', designation: 'PGT Physics', phone: '+91 98765 11111', bloodGroup: 'A+', photo: true, qualification: 'M.Sc, B.Ed, PhD' },
  { id: 'TCH002', name: 'Mr. Rajesh Kumar', empId: 'EMP-002', department: 'Mathematics', designation: 'TGT Mathematics', phone: '+91 98765 22222', bloodGroup: 'B+', photo: true, qualification: 'M.Sc, B.Ed' },
  { id: 'TCH003', name: 'Ms. Ananya Iyer', empId: 'EMP-003', department: 'English', designation: 'PGT English', phone: '+91 98765 33333', bloodGroup: 'O+', photo: true, qualification: 'MA, B.Ed' },
  { id: 'TCH004', name: 'Mr. Vikram Singh', empId: 'EMP-004', department: 'Hindi', designation: 'TGT Hindi', phone: '+91 98765 44444', bloodGroup: 'AB+', photo: true, qualification: 'MA, B.Ed' },
  { id: 'TCH005', name: 'Ms. Deepa Nair', empId: 'EMP-005', department: 'Social Science', designation: 'TGT SST', phone: '+91 98765 55555', bloodGroup: 'B-', photo: true, qualification: 'MA, B.Ed' },
  { id: 'TCH006', name: 'Dr. Suresh Babu', empId: 'EMP-006', department: 'Computer Science', designation: 'PGT Computer', phone: '+91 98765 66666', bloodGroup: 'O-', photo: true, qualification: 'M.Tech, B.Ed' },
]

/**
 * QRStudentLookup - A shared component for QR code scanning or manual student ID entry.
 * Used across Library, Transport, Health, Attendance, and other modules.
 * 
 * Props:
 * - onStudentSelect: (student) => void - callback when student is selected
 * - mode: 'student' | 'teacher' | 'both' - which type to look up
 * - placeholder: string - input placeholder text
 * - showDetails: boolean - whether to show student details card after selection
 * - label: string - label for the input field
 */
export default function QRStudentLookup({
  onStudentSelect,
  mode = 'student',
  placeholder = 'Scan QR or enter Student ID / Name',
  showDetails = true,
  label = 'Student Identification',
}) {
  const [searchValue, setSearchValue] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const db = mode === 'teacher' ? TEACHER_DB : mode === 'both' ? [...STUDENT_DB, ...TEACHER_DB] : STUDENT_DB

  const handleSearch = useCallback((value) => {
    setSearchValue(value)
    setError('')
    setSelectedPerson(null)

    if (!value.trim()) {
      setSuggestions([])
      return
    }

    const query = value.toLowerCase().trim()
    const matches = db.filter(person => {
      const name = (person.name || '').toLowerCase()
      const id = (person.id || '').toLowerCase()
      const bspId = (person.bspId || '').toLowerCase()
      const penNo = (person.penNo || '').toLowerCase()
      const upparId = (person.upparId || '').toLowerCase()
      const empId = (person.empId || '').toLowerCase()
      return name.includes(query) || id.includes(query) || bspId.includes(query) ||
             penNo.includes(query) || upparId.includes(query) || empId.includes(query)
    })

    setSuggestions(matches.slice(0, 8))
  }, [db])

  const handleSelect = useCallback((person) => {
    setSelectedPerson(person)
    setSearchValue(person.name)
    setSuggestions([])
    setError('')
    if (onStudentSelect) onStudentSelect(person)
  }, [onStudentSelect])

  const handleQRScan = useCallback(() => {
    setIsScanning(true)
    // Simulate QR scan - picks a random student
    setTimeout(() => {
      const randomPerson = db[Math.floor(Math.random() * db.length)]
      handleSelect(randomPerson)
      setIsScanning(false)
    }, 1500)
  }, [db, handleSelect])

  const handleClear = useCallback(() => {
    setSearchValue('')
    setSelectedPerson(null)
    setSuggestions([])
    setError('')
    if (onStudentSelect) onStudentSelect(null)
  }, [onStudentSelect])

  const isTeacher = selectedPerson && 'empId' in selectedPerson

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}

      {/* Input Row: QR Scan + Manual Entry */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
          />
          {searchValue && (
            <button onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              {suggestions.map((person) => (
                <button
                  key={person.id}
                  onClick={() => handleSelect(person)}
                  className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-birla-cyan/10 flex items-center justify-center text-birla-cyan text-xs font-bold">
                      {person.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {person.bspId && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">BSP: {person.bspId}</span>}
                        {person.penNo && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">PEN: {person.penNo}</span>}
                        {person.empId && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">EMP: {person.empId}</span>}
                        {!isTeacher && person.class && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">Class {person.class}-{person.section}</span>}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* QR Scan Button */}
        <button
          onClick={handleQRScan}
          disabled={isScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            isScanning
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'gradient-birla text-white hover:opacity-90'
          }`}
        >
          {isScanning ? (
            <>
              <ScanLine className="w-4 h-4 animate-pulse" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4" />
              <span>QR Scan</span>
            </>
          )}
        </button>
      </div>

      {/* Selected Student/Teacher Details Card */}
      {showDetails && selectedPerson && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-birla-cyan/20 bg-birla-cyan/5 p-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-birla-cyan/10 flex items-center justify-center text-birla-cyan font-bold text-sm shrink-0">
              {selectedPerson.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{selectedPerson.name}</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedPerson.bspId && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                    BSP: {selectedPerson.bspId}
                  </span>
                )}
                {selectedPerson.penNo && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    PEN: {selectedPerson.penNo}
                  </span>
                )}
                {selectedPerson.upparId && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                    Uppar: {selectedPerson.upparId}
                  </span>
                )}
                {selectedPerson.empId && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                    EMP: {selectedPerson.empId}
                  </span>
                )}
              </div>
              {!isTeacher && selectedPerson.class && (
                <p className="text-[11px] text-muted-foreground mt-1">
                  Class {selectedPerson.class}-{selectedPerson.section} | Roll No: {selectedPerson.rollNo} | Blood: {selectedPerson.bloodGroup}
                </p>
              )}
              {isTeacher && (
                <p className="text-[11px] text-muted-foreground mt-1">
                  {selectedPerson.designation} | {selectedPerson.department} | Blood: {selectedPerson.bloodGroup}
                </p>
              )}
            </div>
            <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  )
}
