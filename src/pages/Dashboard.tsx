import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { FacultyDashboard } from '@/components/dashboard/FacultyDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { PremiumAdminDashboard } from '@/components/dashboard/PremiumAdminDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [useEnhancedView, setUseEnhancedView] = useState(true);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return useEnhancedView ? <PremiumAdminDashboard /> : <AdminDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <Navigate to="/auth" replace />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderDashboard()}
    </motion.div>
  );
}