/**
 * Shared Teacher Class & Subject Assignment Data
 * Used by HR Module (admin management) and Teacher Portal (teacher view)
 */

export const SUBJECTS = [
  'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'Bengali', 'Sanskrit',
  'Social Science', 'History', 'Geography', 'Civics', 'Economics',
  'Computer Science', 'Information Technology',
  'Physical Education', 'Art', 'Music', 'Dance',
  'General Knowledge', 'Value Education', 'Life Skills',
]

export const CLASSES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

export const SECTIONS = ['A', 'B', 'C', 'D']

export const SUBJECT_CATEGORIES = {
  'Core': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  'Science': ['Physics', 'Chemistry', 'Biology'],
  'Humanities': ['History', 'Geography', 'Civics', 'Economics'],
  'Language': ['English', 'Hindi', 'Bengali', 'Sanskrit'],
  'Co-Scholastic': ['Computer Science', 'Information Technology', 'Physical Education', 'Art', 'Music', 'Dance'],
  'Foundation': ['General Knowledge', 'Value Education', 'Life Skills'],
}

// Teacher database (same as QRStudentLookup TEACHER_DB but with assignment fields)
export const TEACHERS = [
  { id: 'TCH001', name: 'Dr. Priya Menon', empId: 'EMP-001', department: 'Science', designation: 'PGT Physics', qualification: 'M.Sc, B.Ed, PhD', specialization: 'Physics', maxPeriodsPerWeek: 40, currentPeriodsPerWeek: 35 },
  { id: 'TCH002', name: 'Mr. Rajesh Kumar', empId: 'EMP-002', department: 'Mathematics', designation: 'TGT Mathematics', qualification: 'M.Sc, B.Ed', specialization: 'Mathematics', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 38 },
  { id: 'TCH003', name: 'Ms. Ananya Iyer', empId: 'EMP-003', department: 'English', designation: 'PGT English', qualification: 'MA, B.Ed', specialization: 'English', maxPeriodsPerWeek: 40, currentPeriodsPerWeek: 36 },
  { id: 'TCH004', name: 'Mr. Vikram Singh', empId: 'EMP-004', department: 'Hindi', designation: 'TGT Hindi', qualification: 'MA, B.Ed', specialization: 'Hindi', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 40 },
  { id: 'TCH005', name: 'Ms. Deepa Nair', empId: 'EMP-005', department: 'Social Science', designation: 'TGT SST', qualification: 'MA, B.Ed', specialization: 'Social Science', maxPeriodsPerWeek: 40, currentPeriodsPerWeek: 34 },
  { id: 'TCH006', name: 'Dr. Suresh Babu', empId: 'EMP-006', department: 'Computer Science', designation: 'PGT Computer', qualification: 'M.Tech, B.Ed', specialization: 'Computer Science', maxPeriodsPerWeek: 38, currentPeriodsPerWeek: 30 },
  { id: 'TCH007', name: 'Mrs. Kavitha Nair', empId: 'EMP-007', department: 'Science', designation: 'TGT Science', qualification: 'M.Sc, B.Ed', specialization: 'Biology', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 38 },
  { id: 'TCH008', name: 'Mr. Arvind Kumar', empId: 'EMP-008', department: 'Mathematics', designation: 'TGT Mathematics', qualification: 'M.Sc, B.Ed', specialization: 'Mathematics', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 0 },
  { id: 'TCH009', name: 'Ms. Sunita Rao', empId: 'EMP-009', department: 'English', designation: 'TGT English', qualification: 'MA, B.Ed', specialization: 'English', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 36 },
  { id: 'TCH010', name: 'Mr. Rakesh Verma', empId: 'EMP-010', department: 'Physical Education', designation: 'PTI', qualification: 'B.P.Ed, M.P.Ed', specialization: 'Physical Education', maxPeriodsPerWeek: 44, currentPeriodsPerWeek: 40 },
  { id: 'TCH011', name: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', department: 'Arts', designation: 'Art Teacher', qualification: 'BFA, MFA', specialization: 'Art', maxPeriodsPerWeek: 40, currentPeriodsPerWeek: 32 },
  { id: 'TCH012', name: 'Mr. Debu Sen', empId: 'EMP-012', department: 'Bengali', designation: 'TGT Bengali', qualification: 'MA, B.Ed', specialization: 'Bengali', maxPeriodsPerWeek: 42, currentPeriodsPerWeek: 28 },
]

// Core assignment data: teacher → class + subject + role
export const TEACHER_ASSIGNMENTS = [
  // Dr. Priya Menon - PGT Physics
  { id: 'ASN001', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Physics', class: 'XI', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN002', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Physics', class: 'XI', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN003', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Physics', class: 'XII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN004', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Science', class: 'IX', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN005', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Science', class: 'X', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN006', teacherId: 'TCH001', teacherName: 'Dr. Priya Menon', empId: 'EMP-001', subject: 'Science', class: 'X', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },

  // Mr. Rajesh Kumar - TGT Mathematics
  { id: 'ASN007', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'IX', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN008', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'IX', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN009', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'X', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN010', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'X', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN011', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'VIII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN012', teacherId: 'TCH002', teacherName: 'Mr. Rajesh Kumar', empId: 'EMP-002', subject: 'Mathematics', class: 'VIII', section: 'B', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },

  // Ms. Ananya Iyer - PGT English
  { id: 'ASN013', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'IX', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN014', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'IX', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN015', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'X', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN016', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'X', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN017', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'XI', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN018', teacherId: 'TCH003', teacherName: 'Ms. Ananya Iyer', empId: 'EMP-003', subject: 'English', class: 'XII', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },

  // Mr. Vikram Singh - TGT Hindi
  { id: 'ASN019', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'VII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN020', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'VII', section: 'B', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN021', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'VIII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN022', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'VIII', section: 'B', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN023', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'IX', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN024', teacherId: 'TCH004', teacherName: 'Mr. Vikram Singh', empId: 'EMP-004', subject: 'Hindi', class: 'IX', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },

  // Ms. Deepa Nair - TGT Social Science
  { id: 'ASN025', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'Social Science', class: 'IX', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN026', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'Social Science', class: 'IX', section: 'B', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN027', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'Social Science', class: 'X', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN028', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'Social Science', class: 'X', section: 'B', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN029', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'History', class: 'XI', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN030', teacherId: 'TCH005', teacherName: 'Ms. Deepa Nair', empId: 'EMP-005', subject: 'Geography', class: 'XII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },

  // Dr. Suresh Babu - PGT Computer Science
  { id: 'ASN031', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'IX', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN032', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'IX', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN033', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'X', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN034', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'X', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN035', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'XI', section: 'A', periodsPerWeek: 8, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN036', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Information Technology', class: 'XII', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN037', teacherId: 'TCH006', teacherName: 'Dr. Suresh Babu', empId: 'EMP-006', subject: 'Computer Science', class: 'VIII', section: 'A', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },

  // Mrs. Kavitha Nair - TGT Science
  { id: 'ASN038', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Science', class: 'VI', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN039', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Science', class: 'VI', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN040', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Science', class: 'VII', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN041', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Science', class: 'VII', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN042', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Biology', class: 'XI', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN043', teacherId: 'TCH007', teacherName: 'Mrs. Kavitha Nair', empId: 'EMP-007', subject: 'Biology', class: 'XII', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },

  // Ms. Sunita Rao - TGT English
  { id: 'ASN044', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VI', section: 'A', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN045', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VI', section: 'B', periodsPerWeek: 7, role: 'Subject Teacher', isClassTeacher: true },
  { id: 'ASN046', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VII', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN047', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VII', section: 'B', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN048', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VIII', section: 'A', periodsPerWeek: 6, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN049', teacherId: 'TCH009', teacherName: 'Ms. Sunita Rao', empId: 'EMP-009', subject: 'English', class: 'VIII', section: 'B', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },

  // Mr. Rakesh Verma - PTI
  { id: 'ASN050', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VI', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN051', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VII', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN052', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VIII', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN053', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'IX', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN054', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'IX', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN055', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'X', section: 'A', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN056', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'X', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN057', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'XI', section: 'A', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN058', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'XII', section: 'A', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN059', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VI', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN060', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VII', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN061', teacherId: 'TCH010', teacherName: 'Mr. Rakesh Verma', empId: 'EMP-010', subject: 'Physical Education', class: 'VIII', section: 'B', periodsPerWeek: 3, role: 'Subject Teacher', isClassTeacher: false },

  // Mrs. Lakshmi Iyer - Art Teacher
  { id: 'ASN062', teacherId: 'TCH011', teacherName: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', subject: 'Art', class: 'VI', section: 'A', periodsPerWeek: 2, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN063', teacherId: 'TCH011', teacherName: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', subject: 'Art', class: 'VII', section: 'A', periodsPerWeek: 2, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN064', teacherId: 'TCH011', teacherName: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', subject: 'Art', class: 'VIII', section: 'A', periodsPerWeek: 2, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN065', teacherId: 'TCH011', teacherName: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', subject: 'Art', class: 'IX', section: 'A', periodsPerWeek: 2, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN066', teacherId: 'TCH011', teacherName: 'Mrs. Lakshmi Iyer', empId: 'EMP-011', subject: 'Art', class: 'X', section: 'A', periodsPerWeek: 2, role: 'Subject Teacher', isClassTeacher: false },

  // Mr. Debu Sen - TGT Bengali
  { id: 'ASN067', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VI', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN068', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VI', section: 'B', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN069', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VII', section: 'A', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN070', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VII', section: 'B', periodsPerWeek: 5, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN071', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VIII', section: 'A', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },
  { id: 'ASN072', teacherId: 'TCH012', teacherName: 'Mr. Debu Sen', empId: 'EMP-012', subject: 'Bengali', class: 'VIII', section: 'B', periodsPerWeek: 4, role: 'Subject Teacher', isClassTeacher: false },
]

// Helper: Get assignments for a specific teacher
export function getTeacherAssignments(teacherId) {
  return TEACHER_ASSIGNMENTS.filter(a => a.teacherId === teacherId)
}

// Helper: Get assignments for a specific class+section
export function getClassAssignments(className, section) {
  return TEACHER_ASSIGNMENTS.filter(a => a.class === className && a.section === section)
}

// Helper: Get all class teachers
export function getClassTeachers() {
  return TEACHER_ASSIGNMENTS.filter(a => a.isClassTeacher)
}

// Helper: Get teacher workload summary
export function getTeacherWorkload(teacherId) {
  const assignments = getTeacherAssignments(teacherId)
  const teacher = TEACHERS.find(t => t.id === teacherId)
  const totalPeriods = assignments.reduce((sum, a) => sum + a.periodsPerWeek, 0)
  const uniqueClasses = [...new Set(assignments.map(a => `${a.class}-${a.section}`))]
  const uniqueSubjects = [...new Set(assignments.map(a => a.subject))]
  return {
    teacher,
    assignments,
    totalPeriods,
    maxPeriods: teacher?.maxPeriodsPerWeek || 42,
    utilization: teacher ? Math.round((totalPeriods / teacher.maxPeriodsPerWeek) * 100) : 0,
    uniqueClasses,
    uniqueSubjects,
    isClassTeacher: assignments.some(a => a.isClassTeacher),
    classTeacherOf: assignments.filter(a => a.isClassTeacher).map(a => `${a.class}-${a.section}`),
  }
}

// Helper: Get class-subject coverage (which subjects are assigned in which class)
export function getClassSubjectCoverage(className, section) {
  const assignments = getClassAssignments(className, section)
  const coveredSubjects = assignments.map(a => a.subject)
  // Typical subjects for a class
  const requiredSubjects = className === 'XI' || className === 'XII'
    ? ['English', 'Hindi', 'Bengali', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Economics', 'History', 'Geography', 'Physical Education']
    : ['Mathematics', 'Science', 'English', 'Hindi', 'Bengali', 'Social Science', 'Computer Science', 'Physical Education', 'Art', 'General Knowledge', 'Value Education']
  const unassigned = requiredSubjects.filter(s => !coveredSubjects.includes(s))
  return { className, section, assignments, coveredSubjects, unassigned, coverage: Math.round((coveredSubjects.length / requiredSubjects.length) * 100) }
}

// Helper: Generate summary stats
export function getAssignmentStats() {
  const totalAssignments = TEACHER_ASSIGNMENTS.length
  const totalTeachers = TEACHERS.length
  const assignedTeachers = [...new Set(TEACHER_ASSIGNMENTS.map(a => a.teacherId))].length
  const unassignedTeachers = totalTeachers - assignedTeachers
  const classTeachers = TEACHER_ASSIGNMENTS.filter(a => a.isClassTeacher).length
  const totalPeriodsAllocated = TEACHER_ASSIGNMENTS.reduce((sum, a) => sum + a.periodsPerWeek, 0)
  const totalPeriodsCapacity = TEACHERS.reduce((sum, t) => sum + t.maxPeriodsPerWeek, 0)
  const avgWorkload = totalTeachers > 0 ? Math.round(totalPeriodsAllocated / totalTeachers) : 0
  const utilizationRate = totalPeriodsCapacity > 0 ? Math.round((totalPeriodsAllocated / totalPeriodsCapacity) * 100) : 0

  // Classes without full subject coverage
  const allClassSections = [...new Set(TEACHER_ASSIGNMENTS.map(a => `${a.class}-${a.section}`))]
  const underCoveredClasses = allClassSections.filter(cs => {
    const [cls, sec] = cs.split('-')
    const coverage = getClassSubjectCoverage(cls, sec)
    return coverage.coverage < 80
  })

  return {
    totalAssignments,
    totalTeachers,
    assignedTeachers,
    unassignedTeachers,
    classTeachers,
    totalPeriodsAllocated,
    totalPeriodsCapacity,
    avgWorkload,
    utilizationRate,
    underCoveredClasses,
  }
}
