
import { Teacher, Student, ClassInfo, Course, School } from './types.ts';

export const MOCK_SCHOOLS: School[] = [
  { 
    id: 'sch1', 
    name: 'Downtown Branch', 
    location: 'City Center', 
    region: 'Central',
    teacherQuota: 15, 
    currentTeacherCount: 8, 
    studentQuota: 300, 
    currentStudentCount: 210, 
    adminEmail: 'admin@downtown.dir.com',
    contactPerson: 'Mr. David Aung',
    contactPhone: '09-450-123-456',
    lat: 37.7749, 
    lng: -122.4194,
    type: 'HQ',
    approvedCourseIds: ['course-a', 'course-b'],
    description: "Our flagship learning center located in the heart of the city. We focus on bridging the gap between traditional education and future tech. This hub serves as our primary training ground for Digital Information Resources research for middle school learners.",
    establishedDate: "2021-03-12",
    facilities: ["Advanced Robotics Lab", "AI Compute Station", "Smart Presentation Hall", "Fiber Optic Backbone"]
  },
  { 
    id: 'sch2', 
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
    description: "A specialized regional academy focused on primary digital literacy. The Westside Academy provides a cozy yet high-tech environment for younger students to begin their journey with Digital Information Resources.",
    establishedDate: "2022-06-15",
    facilities: ["Digital Literacy Suite", "LEGO Engineering Zone", "Outdoor Maker Space"]
  },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'course-a', 
    name: 'Course A: Digital Creators', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: "The ultimate foundational journey into the digital world. Master binary logic, discover the secret language of computers, and create your very first interactive software with Digital Information Resources.",
    category: "Standard Curriculum",
    level: "Foundation",
    duration: "20 Hours",
    lastUpdated: "2024-08-01",
    modules: [
      {
        id: 'a_m1',
        title: 'Module 1: The Binary Code Secret',
        lessons: [
          { id: 'al1', title: 'Task 1: Thinking in 0s and 1s', type: 'video', content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isPublished: true },
          { id: 'al2', title: 'Task 2: Binary Counting Quest', type: 'quiz', quiz: [
            { id: 'aq1', question: 'How is the number 3 represented in binary?', options: ['10', '11', '01', '00'], correctAnswer: 1 }
          ], isPublished: true },
          { id: 'al3', title: 'Task 3: Create your Binary ID', type: 'assignment', assignmentInstructions: 'Use binary code to write your name on the template.', isPublished: true }
        ]
      },
      {
        id: 'a_m2',
        title: 'Module 2: Visual Code Architect',
        lessons: [
          { id: 'al4', title: 'Task 4: Drag, Drop, and Run', type: 'text', content: 'Visual blocks are the building bricks of code...', isPublished: true },
          { id: 'al5', title: 'Task 5: Sprite Movement Maze', type: 'video', isPublished: true }
        ]
      },
      {
        id: 'a_m3',
        title: 'Module 3: Logic Gates Discovery',
        lessons: [
          { id: 'al6', title: 'Task 6: The AND/OR Bridge', type: 'quiz', quiz: [
             { id: 'aq2', question: 'Which gate needs both lights ON?', options: ['AND', 'OR', 'NOT', 'XOR'], correctAnswer: 0 }
          ], isPublished: true }
        ]
      },
      {
        id: 'a_m4',
        title: 'Module 4: Final Creator Project',
        lessons: [
          { id: 'al7', title: 'Task 7: My Interactive Story', type: 'assignment', assignmentInstructions: 'Build a 3-scene story with interactive buttons.', isPublished: true }
        ]
      }
    ]
  },
  { 
    id: 'course-b', 
    name: 'Course B: Robotics Masters', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    description: "Step into the future with physical computing. Learn to wire circuits, program micro-controllers, and build autonomous robots using Digital Information Resources tools.",
    category: "Robotics",
    level: "Advanced",
    duration: "30 Hours",
    lastUpdated: "2024-08-05",
    modules: [
      {
        id: 'b_m1',
        title: 'Module 1: The Robots Brain',
        lessons: [
          { id: 'bl1', title: 'Task 1: Intro to Controllers', type: 'video', isPublished: true },
          { id: 'bl2', title: 'Task 2: Powering the Board', type: 'text', content: 'Safety first when working with batteries...', isPublished: true }
        ]
      },
      {
        id: 'b_m2',
        title: 'Module 2: Circuitry and Flow',
        lessons: [
          { id: 'bl3', title: 'Task 3: The Glowing LED', type: 'assignment', assignmentInstructions: 'Wire an LED with a 220ohm resistor.', isPublished: true },
          { id: 'bl4', title: 'Task 4: Resistance Quiz', type: 'quiz', quiz: [
            { id: 'bq1', question: 'What unit measures resistance?', options: ['Volts', 'Ohms', 'Amps', 'Watts'], correctAnswer: 1 }
          ], isPublished: true }
        ]
      },
      {
        id: 'b_m3',
        title: 'Module 3: Sensing the World',
        lessons: [
          { id: 'bl5', title: 'Task 5: Eyes of the Robot', type: 'video', isPublished: true },
          { id: 'bl6', title: 'Task 6: Distance Tracking', type: 'text', content: 'Using Ultrasonic waves to see...', isPublished: true }
        ]
      },
      {
        id: 'b_m4',
        title: 'Module 4: Autonomous Maze Runner',
        lessons: [
          { id: 'bl7', title: 'Task 7: Maze Logic Final', type: 'assignment', assignmentInstructions: 'Submit a video of your robot clearing the maze.', isPublished: true }
        ]
      }
    ]
  },
];

export const MOCK_TEACHER: Teacher = {
  id: 't1',
  username: "T1234567",
  firstName: "Jane",
  lastName: "Smith",
  schoolName: "Downtown Branch",
  teacherCode: "DIR-4421",
  role: "Educator",
  assignedClassIds: ['c1', 'c2'],
  branchId: 'sch1'
};

export const MOCK_STUDENTS: Student[] = [
  { 
    id: '1', 
    username: '1000001', 
    firstName: 'Timmy', 
    lastName: 'Lee', 
    finalGrade: 88, 
    passingRate: 80,
    attendance: 26, 
    studyTime: 480, 
    taskCompletion: 82,
    level: 'Course A: Digital Creators', 
    status: 'active',
    activationDate: '2023-09-15',
    registeredClasses: [{ id: 'c1', name: 'Junior Coders A' }]
  },
  { 
    id: '2', 
    username: '1000002', 
    firstName: 'Sarah', 
    lastName: 'Chen', 
    finalGrade: 94, 
    passingRate: 80,
    attendance: 30, 
    studyTime: 550, 
    taskCompletion: 98,
    level: 'Course A: Digital Creators', 
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
    name: 'Junior Coders B', 
    level: 'Level 2', 
    students: [],
    teachers: [MOCK_TEACHER],
    courseId: 'course-b',
    schedule: 'Tue / Thu 02:00 PM',
    progress: 0,
    lastActivity: 'Never'
  }
];

export const LEVELS = ['Course A: Digital Creators', 'Course B: Robotics Masters'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'Chinese'];
export const MODULES = ['Module 1', 'Module 2', 'Module 3', 'Module 4'];
export const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Overseas'];