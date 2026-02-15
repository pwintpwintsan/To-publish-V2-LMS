
export enum UserRole {
  MAIN_CENTER = 'main-center',
  SUPER_ADMIN = 'super-admin',
  SCHOOL_ADMIN = 'school-admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  EDITOR = 'editor'
}

export interface UserPermissions {
  courses: { view: boolean; edit: boolean; delete: boolean };
  certificates: { view: boolean; edit: boolean };
  accounts: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  resources: { view: boolean; upload: boolean; delete: boolean; download: boolean };
  reports: { view: boolean };
}

export interface Order {
  id: string;
  courseId: string;
  courseName: string;
  branchId: string;
  branchName: string;
  seats: number;
  pricePerSeat: number;
  totalAmount: number;
  status: 'pending-approval' | 'approved' | 'completed' | 'rejected';
  date: string;
  requesterName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface FillBlankData {
  text: string; // e.g. "The [blank] jumped over the [blank]."
  answers: string[]; // e.g. ["cat", "fence"]
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'pdf' | 'quiz' | 'assignment' | 'matching' | 'fill-blanks' | 'question-answer';
  description?: string;
  content?: string;
  quiz?: QuizQuestion[];
  matchingPairs?: MatchingPair[];
  fillBlanks?: FillBlankData;
  questions?: string[]; // For 'question-answer' type
  assignmentInstructions?: string;
  characterLimit?: number;
  modelAnswer?: string;
  autoPassOnUpload?: boolean;
  isPublished?: boolean;
  isSample?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  isPublished?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Course {
  id: string;
  name: string;
  isPurchased: boolean;
  isPublished?: boolean; // Course-level access control
  thumbnail: string;
  description?: string;
  category?: string;
  subCategory?: string;
  level?: string;
  duration?: string;
  modules: Module[];
  lastUpdated?: string;
  startDate?: string;
  endDate?: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  region: string;
  teacherQuota: number;
  currentTeacherCount: number;
  studentQuota: number;
  currentStudentCount: number;
  adminEmail: string;
  lat: number;
  lng: number;
  type: 'HQ' | 'Satellite' | 'Regional' | 'Franchise';
  approvedCourseIds: string[];
  description?: string;
  establishedDate?: string;
  facilities?: string[];
  contactPerson?: string;
  contactPhone?: string;
}

export interface Student {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  finalGrade: number;
  passingRate: number;
  attendance: number;
  studyTime: number;
  taskCompletion: number;
  level: string;
  status: 'active' | 'inactive';
  activationDate?: string;
  registeredClasses?: { id: string; name: string }[];
}

export interface Teacher {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  teacherCode: string;
  role: string;
  assignedClassIds: string[];
  branchId?: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  level: string;
  students: Student[];
  teachers: Teacher[];
  courseId: string;
  schedule: string;
  progress: number;
  lastActivity: string;
}

export enum View {
  LANDING = 'landing',
  CHECKOUT = 'checkout',
  MY_CLASSES = 'my-classes',
  CLASSES = 'classes',
  CENTER_LIST = 'center-list',
  CENTER_PROFILE = 'center-profile',
  CENTER_DETAIL = 'center-detail',
  CLASS_DETAIL = 'class-detail',
  STUDENT_DETAIL = 'student-detail',
  STUDENT_DASHBOARD = 'student-dashboard',
  STUDENTS = 'students',
  GRADES = 'grades',
  REPORTS = 'reports',
  CERTIFICATES = 'certificates',
  TESTS = 'tests',
  RESOURCES = 'teaching-resources',
  COURSES_ADMIN = 'courses-admin',
  ROLES_PERMISSIONS = 'roles-permissions',
  EDIT_CERTIFICATES = 'edit-certificates',
  ACCOUNT_CREATION = 'account-creation',
  REGISTER_BRANCH = 'register-branch',
  COURSE_VIEWER = 'course-viewer',
  PROGRAM_SYLLABUS = 'program-syllabus',
  ACCESS_CONTROL = 'access-control'
}
