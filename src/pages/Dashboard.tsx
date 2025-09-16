import { useAuthStore } from '@/store/authStore';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { FacultyDashboard } from '@/components/dashboard/FacultyDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <Navigate to="/auth" replace />;
  }
}