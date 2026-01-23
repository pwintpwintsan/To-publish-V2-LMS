
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { MyClassesView } from './components/views/MyClassesView.tsx';
import { ClassesListView } from './components/views/ClassesListView.tsx';
import { CenterListView } from './components/views/CenterListView.tsx';
import { CenterProfileView } from './components/views/CenterProfileView.tsx';
import { StudentsView } from './components/views/StudentsView.tsx';
import { GradesView } from './components/views/GradesView.tsx';
import { ReportsView } from './components/views/ReportsView.tsx';
import { CertificatesView } from './components/views/CertificatesView.tsx';
import { TestsView } from './components/views/TestsView.tsx';
import { TeachingResourcesView } from './components/views/TeachingResourcesView.tsx';
import { ClassDetailView } from './components/views/ClassDetailView.tsx';
import { StudentDetailView } from './components/views/StudentDetailView.tsx';
import { StudentDashboardView } from './components/views/StudentDashboardView.tsx';
import { CoursesAdminView } from './components/views/CoursesAdminView.tsx';
import { RolesPermissionsView } from './components/views/RolesPermissionsView.tsx';
import { AccountCreationView } from './components/views/AccountCreationView.tsx';
import { EditCertificatesView } from './components/views/EditCertificatesView.tsx';
import { CenterDetailView } from './components/views/CenterDetailView.tsx';
import { BranchRegistrationView } from './components/views/BranchRegistrationView.tsx';
import { CourseViewerView } from './components/views/CourseViewerView.tsx';
import { LandingPageView } from './components/views/LandingPageView.tsx';
import { OrderCheckoutView } from './components/views/OrderCheckoutView.tsx';
import { ProgramSyllabusView } from './components/views/ProgramSyllabusView.tsx';
import { View, Teacher, UserRole, UserPermissions, Order } from './types.ts';
import { MOCK_TEACHER, MOCK_CLASSES } from './constants.tsx';

/**
 * Main App component that manages the global state and routing for the learning center console.
 */
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.MAIN_CENTER);
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [teacher] = useState<Teacher>(MOCK_TEACHER);

  const [rolePermissions, setRolePermissions] = useState<Record<string, UserPermissions>>({
    'Student': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: false },
      accounts: { view: false, create: false, edit: false, delete: false },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: false },
    },
    'Teacher': {
      // Granted edit permission for courses so teachers can edit exams
      courses: { view: true, edit: true, delete: false },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: false, edit: false, delete: false },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: true },
    },
    'Super Admin': {
      // Granted edit permission for courses for full hub control
      courses: { view: true, edit: true, delete: false },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: true, edit: true, delete: true },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: true },
    },
    'School Admin': {
      courses: { view: true, edit: true, delete: true },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: true, edit: true, delete: true },
      resources: { view: true, upload: true, delete: true, download: false },
      reports: { view: true },
    }
  });

  // Helper to check user permissions based on active role
  const checkPermission = useCallback((category: keyof UserPermissions, action: string): boolean => {
    if (!isLoggedIn) return category === 'courses' && action === 'view';
    if (activeRole === UserRole.MAIN_CENTER) {
        if (category === 'resources' && action === 'download') return false;
        return true;
    }
    
    const roleKey = activeRole === UserRole.STUDENT ? 'Student' : 
                    activeRole === UserRole.TEACHER ? 'Teacher' : 
                    activeRole === UserRole.SUPER_ADMIN ? 'Super Admin' : 'School Admin';
    
    const rolePerms = rolePermissions[roleKey];
    if (!rolePerms || !rolePerms[category]) return false;
    
    // For single boolean permissions like 'reports', action can be 'view'
    const permGroup = rolePerms[category] as any;
    if (typeof permGroup === 'boolean') return permGroup;
    return permGroup[action] || false;
  }, [isLoggedIn, activeRole, rolePermissions]);

  // Handle automatic view transitions based on login state and role
  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentView(View.LANDING);
    } else {
      if (activeRole === UserRole.STUDENT) {
        setCurrentView(View.STUDENT_DASHBOARD);
      } else if (activeRole === UserRole.SUPER_ADMIN) {
        setCurrentView(View.CENTER_PROFILE);
      } else {
        if (currentView === View.LANDING) {
          setCurrentView(View.CENTER_LIST);
        }
      }
    }
  }, [isLoggedIn, activeRole]);

  // View renderer switch
  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPageView onLogin={() => setIsLoggedIn(true)} onOrderCreate={(o) => { setCurrentOrder(o); setCurrentView(View.CHECKOUT); }} />;
      case View.CHECKOUT:
        return currentOrder ? <OrderCheckoutView order={currentOrder} onBack={() => setCurrentView(View.MY_CLASSES)} /> : null;
      case View.MY_CLASSES:
        return <MyClassesView 
                  teacher={teacher} 
                  classes={MOCK_CLASSES} 
                  activeRole={activeRole} 
                  onEnterClass={(id) => { setSelectedClassId(id); setCurrentView(View.CLASS_DETAIL); }}
                  onEnterCenter={(id) => { setSelectedCenterId(id); setCurrentView(View.CENTER_DETAIL); }}
                  onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.PROGRAM_SYLLABUS); }}
                  onEditCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSES_ADMIN); }}
                  onAddBranch={() => setCurrentView(View.REGISTER_BRANCH)}
                />;
      case View.CLASSES:
        return <ClassesListView 
                  activeRole={activeRole}
                  onEnterClass={(id) => { setSelectedClassId(id); setCurrentView(View.CLASS_DETAIL); }}
                  onEnterCenter={(id) => { setSelectedCenterId(id); setCurrentView(View.CENTER_DETAIL); }}
                />;
      case View.CENTER_LIST:
        return <CenterListView onEnterCenter={(id) => { setSelectedCenterId(id); setCurrentView(View.CENTER_DETAIL); }} />;
      case View.CENTER_PROFILE:
        return <CenterProfileView activeRole={activeRole} />;
      case View.CENTER_DETAIL:
        return selectedCenterId ? <CenterDetailView 
                                    centerId={selectedCenterId} 
                                    onBack={() => setCurrentView(View.CENTER_LIST)}
                                    onManageCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSES_ADMIN); }}
                                    onPreviewCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    onViewSyllabus={(id) => { setSelectedCourseId(id); setCurrentView(View.PROGRAM_SYLLABUS); }}
                                    checkPermission={checkPermission}
                                  /> : null;
      case View.CLASS_DETAIL:
        return selectedClassId ? <ClassDetailView 
                                    classId={selectedClassId} 
                                    onStudentClick={(id) => { setSelectedStudentId(id); setCurrentView(View.STUDENT_DETAIL); }}
                                    onBack={() => setCurrentView(View.CLASSES)}
                                    onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    onViewSyllabus={(id) => { setSelectedCourseId(id); setCurrentView(View.PROGRAM_SYLLABUS); }}
                                    checkPermission={checkPermission}
                                  /> : null;
      case View.STUDENT_DETAIL:
        return selectedStudentId ? <StudentDetailView 
                                      studentId={selectedStudentId} 
                                      onBack={() => setCurrentView(View.CLASS_DETAIL)}
                                      onClassClick={(id) => { setSelectedClassId(id); setCurrentView(View.CLASS_DETAIL); }}
                                      onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    /> : null;
      case View.STUDENT_DASHBOARD:
        return <StudentDashboardView 
                  onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                  onCourseClick={(id) => { setSelectedCourseId(id); setCurrentView(View.PROGRAM_SYLLABUS); }}
                />;
      case View.STUDENTS:
        return <StudentsView onStudentClick={(id) => { setSelectedStudentId(id); setCurrentView(View.STUDENT_DETAIL); }} checkPermission={checkPermission} />;
      case View.GRADES:
        return <GradesView />;
      case View.REPORTS:
        return <ReportsView activeRole={activeRole} />;
      case View.CERTIFICATES:
        return <CertificatesView />;
      case View.TESTS:
        return <TestsView checkPermission={checkPermission} />;
      case View.RESOURCES:
        return <TeachingResourcesView checkPermission={checkPermission} />;
      case View.COURSES_ADMIN:
        return <CoursesAdminView 
                  initialCourseId={selectedCourseId}
                  onExitEdit={() => { setSelectedCourseId(null); setCurrentView(View.MY_CLASSES); }}
                  onPreviewCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                  checkPermission={checkPermission}
                />;
      case View.ROLES_PERMISSIONS:
        return <RolesPermissionsView 
                  activeRole={activeRole}
                  onRegisterBranch={() => setCurrentView(View.REGISTER_BRANCH)}
                  rolePerms={rolePermissions}
                  setRolePerms={setRolePermissions}
                />;
      case View.EDIT_CERTIFICATES:
        return <EditCertificatesView />;
      case View.ACCOUNT_CREATION:
        return <AccountCreationView checkPermission={checkPermission} />;
      case View.REGISTER_BRANCH:
        return <BranchRegistrationView onBack={() => setCurrentView(View.ROLES_PERMISSIONS)} />;
      case View.COURSE_VIEWER:
        return selectedCourseId ? <CourseViewerView courseId={selectedCourseId} onBack={() => setCurrentView(View.MY_CLASSES)} /> : null;
      case View.PROGRAM_SYLLABUS:
        return selectedCourseId ? <ProgramSyllabusView 
                                    courseId={selectedCourseId} 
                                    onBack={() => setCurrentView(View.MY_CLASSES)}
                                    onEnroll={() => { setCurrentOrder({ id: 'NEW-' + Date.now(), courseId: selectedCourseId, courseName: 'New Program Enrollment', branchId: 'sch1', branchName: 'Downtown Branch', seats: 10, pricePerSeat: 50000, totalAmount: 500000, status: 'pending-approval', date: new Date().toISOString(), requesterName: 'Jane Smith' }); setCurrentView(View.CHECKOUT); }}
                                    onEdit={() => { setCurrentView(View.COURSES_ADMIN); }}
                                    activeRole={activeRole}
                                  /> : null;
      default:
        return <LandingPageView onLogin={() => setIsLoggedIn(true)} onOrderCreate={(o) => { setCurrentOrder(o); setCurrentView(View.CHECKOUT); }} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        schoolName={teacher.schoolName}
        teacherCode={teacher.teacherCode}
        activeRole={activeRole}
        isLoggedIn={isLoggedIn}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onRoleChange={setActiveRole}
        onLogout={() => setIsLoggedIn(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        {isLoggedIn && (
          <Sidebar 
            currentView={currentView}
            onViewChange={setCurrentView}
            activeRole={activeRole}
            checkPermission={checkPermission}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-hidden p-4 md:p-8 bg-slate-50 relative">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

// Export App as the default export to be used in index.tsx
export default App;
