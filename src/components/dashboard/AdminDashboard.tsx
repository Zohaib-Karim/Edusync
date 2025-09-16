import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Building, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useAppStore } from '@/store/appStore';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export function AdminDashboard() {
  const { analytics, loadAnalytics, classrooms, faculties, subjects } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      await loadAnalytics();
      setIsLoading(false);
    };

    if (!analytics) {
      fetchAnalytics();
    }
  }, [analytics, loadAnalytics]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      title: 'Total Classrooms',
      value: classrooms.length,
      change: '+2 this month',
      changeType: 'positive' as const,
      icon: Building,
      color: 'text-blue-500'
    },
    {
      title: 'Active Faculty',
      value: faculties.length,
      change: '+1 this week',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-purple-500'
    },
    {
      title: 'Total Subjects',
      value: subjects.length,
      change: 'No change',
      changeType: 'neutral' as const,
      icon: BookOpen,
      color: 'text-green-500'
    },
    {
      title: 'Utilization Rate',
      value: '73%',
      change: '+5% from last week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      action: 'New timetable generated',
      description: 'CS Semester 5 - Spring 2024',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: '2',
      action: 'Faculty leave approved',
      description: 'Dr. Alice Smith - March 15th',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: '3',
      action: 'Room booking conflict',
      description: 'LH-101 double booked for 2:00 PM',
      time: '1 hour ago',
      status: 'warning'
    },
    {
      id: '4',
      action: 'New faculty registered',
      description: 'Prof. David Wilson - Mathematics',
      time: '3 hours ago',
      status: 'completed'
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Smart Classroom system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Button variant="gradient" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="hover:shadow-medium transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : stat.changeType === 'neutral'
                    ? 'text-muted-foreground'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Classroom utilization and faculty workload</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="utilization" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="utilization">Classroom Utilization</TabsTrigger>
                  <TabsTrigger value="workload">Faculty Workload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="utilization" className="space-y-4">
                  {analytics?.classroomUtilization && (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.classroomUtilization}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="classroomId" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="utilization" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </TabsContent>
                
                <TabsContent value="workload" className="space-y-4">
                  {analytics?.facultyWorkload && (
                    <div className="space-y-4">
                      {analytics.facultyWorkload.map((faculty, index) => {
                        const facultyData = faculties.find(f => f.id === faculty.facultyId);
                        return (
                          <div key={faculty.facultyId} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{facultyData?.name || `Faculty ${faculty.facultyId}`}</span>
                              <span>{faculty.workload}%</span>
                            </div>
                            <Progress value={faculty.workload} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities & Conflicts */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' 
                      ? 'bg-green-500' 
                      : activity.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Conflicts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Active Conflicts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analytics?.conflicts.map((conflict, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{conflict.type}</p>
                    <p className="text-xs text-muted-foreground">{conflict.count} instances</p>
                  </div>
                  <Badge 
                    variant={
                      conflict.severity === 'high' 
                        ? 'destructive' 
                        : conflict.severity === 'medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {conflict.severity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}