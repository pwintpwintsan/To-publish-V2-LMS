
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
    approvedCourseIds: ['course-a', 'course-b'],
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
    approvedCourseIds: ['course-a'],
    description: "A specialized regional academy focused on primary digital literacy.",
    establishedDate: "2022-06-15",
    facilities: ["Digital Literacy Suite", "Maker Space"]
  },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'course-a', 
    name: 'Digital Creators Level 1', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: "Master binary logic and discover the secret language of computers.",
    category: "Computing",
    level: "Foundation",
    duration: "20 Hours",
    lastUpdated: "2024-08-01",
    modules: [
      {
        id: 'a_m1',
        title: 'Module 1: The Binary Code Secret',
        lessons: [
          { id: 'al1', title: 'Task 1: Thinking in 0s and 1s', type: 'video', isPublished: true },
          { id: 'al2', title: 'Task 2: Binary Counting Quest', type: 'quiz', quiz: [
            { id: 'aq1', question: 'How is number 3 in binary?', options: ['10', '11', '01', '00'], correctAnswer: 1 }
          ], isPublished: true }
        ]
      }
    ]
  },
  { 
    id: 'course-b', 
    name: 'Robotics Masters Level 1', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    description: "Step into the future with physical computing and autonomous robots.",
    category: "Robotics",
    level: "Advanced",
    duration: "30 Hours",
    lastUpdated: "2024-08-05",
    modules: [
      {
        id: 'b_m1',
        title: 'Module 1: The Robots Brain',
        lessons: [
          { id: 'bl1', title: 'Task 1: Intro to Controllers', type: 'video', isPublished: true }
        ]
      }
    ]
  },
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
    level: 'Digital Creators Level 1', 
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
    level: 'Digital Creators Level 1', 
    status: 'active',
    activationDate: '2023-10-01',
    registeredClasses: [{ id: 'c1', name: 'Junior Coders A' }]
  }
];

export const MOCK_CLASSES: ClassInfo[] = [
  { 
    id: 'c1', 
    name: 'Junior Coders A', 
    level: 'Level 1', 
    students: MOCK_STUDENTS,
    teachers: [MOCK_TEACHER],
    courseId: 'course-a',
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
    courseId: 'course-b',
    schedule: 'Tue / Thu 02:00 PM',
    progress: 0,
    lastActivity: 'Never'
  }
];

export const LEVELS = ['Digital Creators', 'Robotics Masters'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'Chinese'];
export const MODULES = ['Module 1', 'Module 2', 'Module 3', 'Module 4'];
export const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Overseas'];
