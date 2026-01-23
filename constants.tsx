
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
    approvedCourseIds: ['dk-starter', 'cc-12', 'rb-12'],
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
  // 🔰 Beginner
  { 
    id: 'dk-starter', 
    name: 'Digital Kids Starter / Explorer', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    description: "Foundation for digital literacy, computer safety, and creative tools for young learners.",
    category: "Standard Curriculum",
    level: "🔰 Beginner",
    duration: "15 Hours",
    lastUpdated: "2025-01-10",
    modules: [{ id: 'm1', title: 'Module 1: My First Computer', lessons: [{ id: 'l1', title: 'Power On!', type: 'video' }] }]
  },
  { 
    id: 'cc-12', 
    name: 'Can Code 1–2 (ScratchJr)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: "Learn basic sequences, loops, and visual coding logic through ScratchJr story-building.",
    category: "Logic",
    level: "🔰 Beginner",
    duration: "20 Hours",
    modules: [{ id: 'm1', title: 'Sequence Logic', lessons: [{ id: 'l1', title: 'Moving the Cat', type: 'assignment' }] }]
  },
  { 
    id: 'rb-12', 
    name: 'Robotics 1–2 (Bee-Bot)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    description: "Introduction to simple robot control and spatial navigation with tactile Bee-Bots.",
    category: "Robotics",
    level: "🔰 Beginner",
    duration: "20 Hours",
    modules: [{ id: 'm1', title: 'Tactile Commands', lessons: [{ id: 'l1', title: 'Pathfinding Quest', type: 'quiz' }] }]
  },

  // ⚙️ Intermediate
  { 
    id: 'dk-racer', 
    name: 'Digital Kids Racer / Flyer', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop',
    description: "Speed typing, internet research techniques, and advanced creative software applications.",
    category: "Standard Curriculum",
    level: "⚙️ Intermediate",
    duration: "25 Hours",
    modules: [{ id: 'm1', title: 'Internet Explorer', lessons: [{ id: 'l1', title: 'Smart Search', type: 'video' }] }]
  },
  { 
    id: 'cc-34', 
    name: 'Can Code 3–4 (Scratch)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    description: "Master events, conditions, and complex animations using the full Scratch 3.0 workspace.",
    category: "Logic",
    level: "⚙️ Intermediate",
    duration: "30 Hours",
    modules: [{ id: 'm1', title: 'Conditionals', lessons: [{ id: 'l1', title: 'If-Then Loops', type: 'assignment' }] }]
  },
  { 
    id: 'rb-34', 
    name: 'Robotics 3–4 (Sensors)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c2079ee0638?q=80&w=800&auto=format&fit=crop',
    description: "Interactive robotics using ultrasonic and light sensors to react to the environment.",
    category: "Robotics",
    level: "⚙️ Intermediate",
    duration: "30 Hours",
    modules: [{ id: 'm1', title: 'Environmental Reaction', lessons: [{ id: 'l1', title: 'Avoid Obstacles', type: 'quiz' }] }]
  },

  // 🚀 Advanced
  { 
    id: 'dk-genius', 
    name: 'Digital Kids Genius / Expert', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    description: "Professional digital workflows, cybersecurity basics, and advanced content creation.",
    category: "Standard Curriculum",
    level: "🚀 Advanced",
    duration: "35 Hours",
    modules: [{ id: 'm1', title: 'System Security', lessons: [{ id: 'l1', title: 'Encryption 101', type: 'assignment' }] }]
  },
  { 
    id: 'cc-56', 
    name: 'Can Code 5–6 (Python Intro)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    description: "Bridge between blocks and text. Algorithms, variables, and syntax in real Python.",
    category: "Logic",
    level: "🚀 Advanced",
    duration: "40 Hours",
    modules: [{ id: 'm1', title: 'Python Syntax', lessons: [{ id: 'l1', title: 'Variable Operations', type: 'assignment' }] }]
  },
  { 
    id: 'rb-56', 
    name: 'Robotics 5–6 (EV3 / Python)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop',
    description: "High-level robot engineering with Lego EV3 and Python scripts for autonomous behavior.",
    category: "Robotics",
    level: "🚀 Advanced",
    duration: "40 Hours",
    modules: [{ id: 'm1', title: 'Autonomous Logic', lessons: [{ id: 'l1', title: 'Mission Mars', type: 'video' }] }]
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
