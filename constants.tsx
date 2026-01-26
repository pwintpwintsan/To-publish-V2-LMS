
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
  { 
    id: 'dk-starter', 
    name: 'Digital Kids Starter / Explorer', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    description: "A foundational journey into the digital world for young minds.",
    category: "Standard Curriculum",
    level: "🔰 Beginner",
    duration: "20 Hours",
    lastUpdated: "2025-02-01",
    modules: [
      { 
        id: 'dk-m1', title: 'Module 1: Computer Hardware Hub', isPublished: true,
        lessons: [
          { id: 'dk-l1', title: 'The Power of the CPU', type: 'video', isPublished: true },
          { id: 'dk-l2', title: 'Identifying Peripheral Devices', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'Which is an input device?', options: ['Monitor', 'Mouse', 'Printer', 'Speaker'], correctAnswer: 1}] },
          { id: 'dk-l3', title: 'Caring for your Device', type: 'text', content: 'Always keep liquids away from the keyboard...', isPublished: true }
        ] 
      },
      { 
        id: 'dk-m2', title: 'Module 2: Creative Digital Arts', isPublished: true,
        lessons: [
          { id: 'dk-l4', title: 'Introduction to Pixels', type: 'video', isPublished: true },
          { id: 'dk-l5', title: 'Draw your Hub Avatar', type: 'assignment', assignmentInstructions: 'Use the paint tool to draw yourself.', isPublished: true },
          { id: 'dk-l6', title: 'Understanding Resolution', type: 'text', content: 'Pixels are the building blocks...', isPublished: true }
        ] 
      },
      { 
        id: 'dk-m3', title: 'Module 3: Internet Explorer Safely', isPublished: true,
        lessons: [
          { id: 'dk-l7', title: 'Safe Web Browsing', type: 'video', isPublished: true },
          { id: 'dk-l8', title: 'Cyber Safety Protocol Quiz', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'Should you share your password?', options: ['Yes', 'No', 'Maybe', 'Only with strangers'], correctAnswer: 1}] },
          { id: 'dk-l9', title: 'Smart Search Skills', type: 'assignment', assignmentInstructions: 'Search for three facts about robots.', isPublished: true }
        ] 
      },
      { 
        id: 'dk-m4', title: 'Module 4: Writing & Documents', isPublished: true,
        lessons: [
          { id: 'dk-l10', title: 'Word Processing Intro', type: 'video', isPublished: true },
          { id: 'dk-l11', title: 'Font & Style Mastery', type: 'assignment', assignmentInstructions: 'Write a 3-sentence story with different colors.', isPublished: true },
          { id: 'dk-l12', title: 'Saving Documents', type: 'text', content: 'CTRL + S is your best friend...', isPublished: true }
        ] 
      },
      { 
        id: 'dk-m5', title: 'Module 5: Presentation Wizard', isPublished: true,
        lessons: [
          { id: 'dk-l13', title: 'Making Dynamic Slides', type: 'video', isPublished: true },
          { id: 'dk-l14', title: 'Slide Transition Quiz', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'What is a transition?', options: ['A color', 'A sound', 'Movement between slides', 'A font'], correctAnswer: 2}] },
          { id: 'dk-l15', title: 'My Hobby Slideshow', type: 'assignment', assignmentInstructions: 'Create 3 slides about your hobby.', isPublished: true }
        ] 
      },
      { 
        id: 'dk-m6', title: 'Module 6: Digital Citizenship', isPublished: true,
        lessons: [
          { id: 'dk-l16', title: 'Being Kind Online', type: 'video', isPublished: true },
          { id: 'dk-l17', title: 'Final Review Q&A', type: 'text', content: 'Ask your teacher anything about the course!', isPublished: true },
          { id: 'dk-l18', title: 'Course Mastery Exam', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'What is digital literacy?', options: ['Cooking', 'Using computers effectively', 'Running', 'Sleeping'], correctAnswer: 1}] }
        ] 
      }
    ]
  },
  { 
    id: 'cc-12', 
    name: 'Can Code 1–2 (ScratchJr)', 
    isPurchased: true, 
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: "Visual logic and creative storytelling through block-based coding.",
    category: "Logic",
    level: "🔰 Beginner",
    duration: "25 Hours",
    modules: [
      { 
        id: 'cc-m1', title: 'Module 1: Coding Foundations', isPublished: true,
        lessons: [
          { id: 'cc-l1', title: 'Welcome to ScratchJr', type: 'video', isPublished: true },
          { id: 'cc-l2', title: 'Meet the Sprites', type: 'text', content: 'Sprites are the characters you code...', isPublished: true },
          { id: 'cc-l3', title: 'Yellow vs Blue Blocks', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'What do blue blocks do?', options: ['Start', 'Sound', 'Motion', 'Control'], correctAnswer: 2}] }
        ] 
      },
      { 
        id: 'cc-m2', title: 'Module 2: Motion Sequences', isPublished: true,
        lessons: [
          { id: 'cc-l4', title: 'Walking Across the Screen', type: 'video', isPublished: true },
          { id: 'cc-l5', title: 'Jump and Turn Challenge', type: 'assignment', assignmentInstructions: 'Make the cat jump twice and turn right.', isPublished: true },
          { id: 'cc-l6', title: 'Wait Block Protocol', type: 'text', content: 'Use the clock block to add pauses...', isPublished: true }
        ] 
      },
      { 
        id: 'cc-m3', title: 'Module 3: Events & Triggers', isPublished: true,
        lessons: [
          { id: 'cc-l7', title: 'Tap to Start', type: 'video', isPublished: true },
          { id: 'cc-l8', title: 'The Message Block Hub', type: 'assignment', assignmentInstructions: 'Code two characters to talk to each other.', isPublished: true },
          { id: 'cc-l9', title: 'Trigger Quiz', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'Which block runs on tap?', options: ['Flag', 'Envelope', 'Finger Tap', 'Loop'], correctAnswer: 2}] }
        ] 
      },
      { 
        id: 'cc-m4', title: 'Module 4: Background Wizard', isPublished: true,
        lessons: [
          { id: 'cc-l10', title: 'Designing your World', type: 'video', isPublished: true },
          { id: 'cc-l11', title: 'Scene Transition Script', type: 'assignment', assignmentInstructions: 'Move a character and change the background.', isPublished: true },
          { id: 'cc-l12', title: 'Backdrop Logic', type: 'text', content: 'Backdrops set the stage for your story.', isPublished: true }
        ] 
      },
      { 
        id: 'cc-m5', title: 'Module 5: Recording & Sound', isPublished: true,
        lessons: [
          { id: 'cc-l13', title: 'Custom Voices', type: 'video', isPublished: true },
          { id: 'cc-l14', title: 'Sound Effect Quiz', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'Can you record sound?', options: ['No', 'Yes', 'Only on Sundays', 'Only for Cats'], correctAnswer: 1}] },
          { id: 'cc-l15', title: 'Musical Sprites', type: 'assignment', assignmentInstructions: 'Create a dancing sprite with music.', isPublished: true }
        ] 
      },
      { 
        id: 'cc-m6', title: 'Module 6: Grand Finale Project', isPublished: true,
        lessons: [
          { id: 'cc-l16', title: 'Advanced Logic Review', type: 'text', content: 'Combine loops, messages, and motion...', isPublished: true },
          { id: 'cc-l17', title: 'Project: Final Story', type: 'assignment', assignmentInstructions: 'Code a full story with 3 scenes.', isPublished: true },
          { id: 'cc-l18', title: 'Final Certification Quiz', type: 'quiz', isPublished: true, quiz: [{id: '1', question: 'What is a loop?', options: ['A circle', 'Repeating code', 'Stopping code', 'Deleting code'], correctAnswer: 1}] }
        ] 
      }
    ]
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
