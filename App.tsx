
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

  // Persistent Library State (Filters, Sort, etc.)
  const [libraryFilter, setLibraryFilter] = useState('');
  const [librarySort, setLibrarySort] = useState<'name' | 'newest'>('name');

  const [rolePermissions, setRolePermissions] = useState<Record<string, UserPermissions>>({
    'Student': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: false },
      accounts: { view: false, create: false, edit: false, delete: false },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: false },
    },
    'Teacher': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: false, edit: false, delete: false },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: true },
    },
    'Super Admin': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: true, edit: true, delete: true },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: true },
    },
    'School Admin': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: true, edit: true, delete: true },
      resources: { view: true, upload: false, delete: false, download: false },
      reports: { view: true },
    }
  });

  const checkPermission = useCallback((category: keyof UserPermissions, action: string): boolean => {
    if (!isLoggedIn) return category === 'courses' && action === 'view';
    if (activeRole === UserRole.MAIN_CENTER) return true;
    const roleKey = activeRole === UserRole.STUDENT ? 'Student' : 
                    activeRole === UserRole.TEACHER ? 'Teacher' : 
                    activeRole === UserRole.SUPER_ADMIN ? 'Super Admin' : 'School Admin';
    const rolePerms = rolePermissions[roleKey];
    if (!rolePerms || !rolePerms[category]) return false;
    const permGroup = rolePerms[category] as any;
    if (typeof permGroup === 'boolean') return permGroup;
    return permGroup[action] || false;
  }, [isLoggedIn, activeRole, rolePermissions]);

  const handleGoHome = useCallback(() => {
    if (!isLoggedIn) {
      setCurrentView(View.LANDING);
    } else {
      if (activeRole === UserRole.STUDENT) {
        setCurrentView(View.STUDENT_DASHBOARD);
      } else if (activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN || activeRole === UserRole.TEACHER) {
        setCurrentView(View.CENTER_PROFILE);
      } else {
        setCurrentView(View.CENTER_LIST);
      }
    }
    setIsSidebarOpen(false);
  }, [isLoggedIn, activeRole]);

  const handleGoAccessControl = useCallback(() => {
    // Navigate to the management view that allows toggling access
    setCurrentView(View.COURSES_ADMIN);
    setIsSidebarOpen(false);
  }, []);

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

  const renderView = () => {
    // UPDATED: Now clicking back goes directly to the role-specific dashboard (Home)
    const backHome = () => handleGoHome();

    switch (currentView) {
      case View.LANDING:
        return <LandingPageView onLogin={(role) => { if(role) setActiveRole(role); setIsLoggedIn(true); }} onOrderCreate={(o) => { setCurrentOrder(o); setCurrentView(View.CHECKOUT); }} />;
      case View.CHECKOUT:
        return currentOrder ? <OrderCheckoutView order={currentOrder} onBack={backHome} /> : null;
      case View.MY_CLASSES:
        return <MyClassesView 
                  teacher={teacher} 
                  classes={MOCK_CLASSES} 
                  activeRole={activeRole} 
                  filterText={libraryFilter}
                  onFilterChange={setLibraryFilter}
                  sortOrder={librarySort}
                  onSortChange={setLibrarySort}
                  onEnterClass={(id) => { setSelectedClassId(id); setCurrentView(View.CLASS_DETAIL); }}
                  onEnterCenter={(id) => { setSelectedCenterId(id); setCurrentView(View.CENTER_DETAIL); }}
                  onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                  onEditCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSES_ADMIN); }}
                  onAddBranch={() => setCurrentView(View.REGISTER_BRANCH)}
                  onBack={backHome}
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
        return <CenterProfileView 
                  activeRole={activeRole} 
                  onAddLearner={() => setCurrentView(View.ACCOUNT_CREATION)}
                />;
      case View.CENTER_DETAIL:
        return selectedCenterId ? <CenterDetailView 
                                    centerId={selectedCenterId} 
                                    onBack={backHome}
                                    onManageCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSES_ADMIN); }}
                                    onPreviewCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    onViewSyllabus={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    checkPermission={checkPermission}
                                    activeRole={activeRole}
                                  /> : null;
      case View.CLASS_DETAIL:
        return selectedClassId ? <ClassDetailView 
                                    classId={selectedClassId} 
                                    onStudentClick={(id) => { setSelectedStudentId(id); setCurrentView(View.STUDENT_DETAIL); }}
                                    onBack={backHome}
                                    onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    onViewSyllabus={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    checkPermission={checkPermission}
                                  /> : null;
      case View.STUDENT_DETAIL:
        return selectedStudentId ? <StudentDetailView 
                                      studentId={selectedStudentId} 
                                      onBack={backHome}
                                      onClassClick={(id) => { setSelectedClassId(id); setCurrentView(View.CLASS_DETAIL); }}
                                      onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                                    /> : null;
      case View.STUDENT_DASHBOARD:
        return <StudentDashboardView 
                  onEnterCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                  onCourseClick={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                />;
      case View.STUDENTS:
        return <StudentsView 
                  onStudentClick={(id) => { setSelectedStudentId(id); setCurrentView(View.STUDENT_DETAIL); }} 
                  onAddStudent={() => setCurrentView(View.ACCOUNT_CREATION)}
                  onBack={backHome}
                  checkPermission={checkPermission} 
                />;
      case View.GRADES:
        return <GradesView onBack={backHome} />;
      case View.REPORTS:
        return <ReportsView activeRole={activeRole} onBack={backHome} />;
      case View.CERTIFICATES:
        return <CertificatesView onBack={backHome} />;
      case View.TESTS:
        return <TestsView checkPermission={checkPermission} activeRole={activeRole} onBack={backHome} />;
      case View.RESOURCES:
        return <TeachingResourcesView checkPermission={checkPermission} onBack={backHome} />;
      case View.COURSES_ADMIN:
        return <CoursesAdminView 
                  initialCourseId={selectedCourseId}
                  onExitEdit={backHome}
                  onPreviewCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_VIEWER); }}
                  checkPermission={checkPermission}
                  activeRole={activeRole}
                />;
      case View.ROLES_PERMISSIONS:
        return <RolesPermissionsView 
                  activeRole={activeRole}
                  onRegisterBranch={() => setCurrentView(View.REGISTER_BRANCH)}
                  rolePerms={rolePermissions}
                  setRolePerms={setRolePermissions}
                  onBack={backHome}
                />;
      case View.EDIT_CERTIFICATES:
        return <EditCertificatesView onBack={backHome} />;
      case View.ACCOUNT_CREATION:
        return <AccountCreationView activeRole={activeRole} checkPermission={checkPermission} onBack={backHome} />;
      case View.REGISTER_BRANCH:
        return <BranchRegistrationView onBack={() => setCurrentView(View.ROLES_PERMISSIONS)} />;
      case View.COURSE_VIEWER:
        return selectedCourseId ? <CourseViewerView courseId={selectedCourseId} onBack={backHome} /> : null;
      default:
        return <LandingPageView onLogin={(role) => { if(role) setActiveRole(role); setIsLoggedIn(true); }} onOrderCreate={(o) => { setCurrentOrder(o); setCurrentView(View.CHECKOUT); }} />;
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
        onGoHome={handleGoHome}
        onGoAccessControl={handleGoAccessControl}
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

export default App;
