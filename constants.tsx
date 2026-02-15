
import { Teacher, Student, ClassInfo, Course, School } from './types.ts';

export const MOCK_SCHOOLS: School[] = [
  { 
    id: '7244', 
    name: 'EDULIGHT School', 
    location: 'Bago', 
    region: 'Central',
    teacherQuota: 15, 
    currentTeacherCount: 8, 
    studentQuota: 300, 
    currentStudentCount: 210, 
    adminEmail: 'admin@edulight.dir.com',
    contactPerson: 'Min Hein Zaw',
    contactPhone: '0943170083',
    lat: 37.7749, 
    lng: -122.4194,
    type: 'Regional',
    approvedCourseIds: ['dk-starter', 'cc-p-1', 'rb-1'],
    description: "Located at No. 9/29, U Pon Nya Street, Quarter 2, Oakthamyo Thit, Bago. Providing modern digital literacy for the Bago community.",
    establishedDate: "2025-02-02",
    facilities: ["Tech Lab", "Smart Classrooms", "Library"]
  },
  { 
    id: '8192', 
    name: 'Westside Academy', 
    location: 'Western District', 
    region: 'West',
    teacherQuota: 8, 
    currentTeacherCount: 5, 
    studentQuota: 150, 
    currentStudentCount: 120, 
    adminEmail: 'manager@westside.dir.com',
    contactPerson: 'Ms. Hla Hla',
    contactPhone: '09-261-789-012',
    lat: 37.7599, 
    lng: -122.4148,
    type: 'Regional',
    approvedCourseIds: ['dk-starter'],
    description: "A specialized regional academy focused on primary digital literacy.",
    establishedDate: "2022-06-15",
    facilities: ["Digital Literacy Suite", "Maker Space"]
  },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'dk-starter', 
    name: 'Digital Kids Starter', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    description: "Foundational digital skills for the youngest learners.",
    category: "DIGITAL KIDS",
    level: "Starter",
    duration: "20 Hours",
    lastUpdated: "2025-02-01",
    modules: []
  },
  { 
    id: 'dk-explorer', 
    name: 'Digital Kids Explorer', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    description: "Exploring the vast world of computing and creativity.",
    category: "DIGITAL KIDS",
    level: "Explorer",
    duration: "22 Hours",
    modules: []
  },
  { 
    id: 'cc-p-1', 
    name: 'Can Code 1', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: "Introductory logic and block-based programming for Primary.",
    category: "Coding",
    subCategory: "Primary",
    level: "Can Code 1",
    duration: "25 Hours",
    modules: []
  },
  { 
    id: 'cc-s-1', 
    name: 'Can Code 1 (Secondary)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    description: "Foundational text-based logic for secondary students.",
    category: "Coding",
    subCategory: "Secondary",
    level: "Can Code 1",
    duration: "25 Hours",
    modules: []
  },
  { 
    id: 'rb-1', 
    name: 'Robotics 1', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop',
    description: "Building your first automated machines.",
    category: "Robotics",
    level: "Robotics 1",
    duration: "30 Hours",
    modules: []
  },
  { 
    id: 'rb-2', 
    name: 'Robotics 2', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?q=80&w=800&auto=format&fit=crop',
    description: "Sensors, actuators and logic in robotics.",
    category: "Robotics",
    level: "Robotics 2",
    duration: "32 Hours",
    modules: []
  },
  { 
    id: 'dk-racer', 
    name: 'Digital Kids Racer', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop',
    description: "Speed through the digital landscape with advanced tools.",
    category: "DIGITAL KIDS",
    level: "Racer",
    duration: "24 Hours",
    modules: []
  },
  { 
    id: 'cc-p-3', 
    name: 'Can Code 3', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
    description: "Intermediate algorithmic thinking for Primary.",
    category: "Coding",
    subCategory: "Primary",
    level: "Can Code 3",
    duration: "28 Hours",
    modules: []
  }
];

export const MOCK_TEACHER: Teacher = {
  id: 't1',
  username: "T4421",
  firstName: "Jane",
  lastName: "Smith",
  schoolName: "EDULIGHT School",
  teacherCode: "DIR-4421",
  role: "Educator",
  assignedClassIds: ['c1', 'c2'],
  branchId: '7244'
};

export const MOCK_STUDENTS: Student[] = [
  { 
    id: '1', 
    username: '4001', 
    firstName: 'Timmy', 
    lastName: 'Lee', 
    finalGrade: 88, 
    passingRate: 80,
    attendance: 26, 
    studyTime: 480, 
    taskCompletion: 82,
    level: 'Digital Kids Starter', 
    status: 'active',
    activationDate: '2023-09-15',
    registeredClasses: [{ id: 'c1', name: 'Junior Coders A' }]
  },
  { 
    id: '2', 
    username: '4002', 
    firstName: 'Sarah', 
    lastName: 'Chen', 
    finalGrade: 94, 
    passingRate: 80,
    attendance: 30, 
    studyTime: 550, 
    taskCompletion: 98,
    level: 'Digital Kids Starter', 
    status: 'active',
    activationDate: '2023-10-01',
    registeredClasses: [{ id: 'c1', name: 'Junior Coders A' }]
  }
];

export const MOCK_CLASSES: ClassInfo[] = [
  { 
    id: 'c1', 
    name: 'Junior Coders A', 
    level: 'Beginner', 
    students: MOCK_STUDENTS,
    teachers: [MOCK_TEACHER],
    courseId: 'dk-starter',
    schedule: 'Mon / Wed 10:00 AM',
    progress: 72,
    lastActivity: '1 hour ago'
  },
  { 
    id: 'c2', 
    name: 'Robot Workshop B', 
    level: 'Advanced', 
    students: [],
    teachers: [MOCK_TEACHER],
    courseId: 'rb-56',
    schedule: 'Tue / Thu 02:00 PM',
    progress: 0,
    lastActivity: 'Never'
  }
];

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'Chinese'];
export const MODULES = ['Module 1', 'Module 2', 'Module 3', 'Module 4'];
export const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Overseas'];
