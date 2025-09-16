import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  MapPin,
  Bell,
  GraduationCap,
  Users,
  Star,
  ChevronRight,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { format, addDays, startOfWeek } from 'date-fns';

export function StudentDashboard() {
  const { user } = useAuthStore();
  const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date()));

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

  // Mock student data
  const studentInfo = {
    semester: 5,
    cgpa: 8.7,
    credits: 18,
    attendance: 92
  };

  const todaySchedule = [
    {
      time: '09:00 - 10:30',
      subject: 'Database Systems',
      faculty: 'Dr. Alice Smith',
      room: 'LH-101',
      type: 'Lecture',
      building: 'Academic Block A'
    },
    {
      time: '11:00 - 12:30',
      subject: 'Operating Systems',
      faculty: 'Prof. Robert Johnson',
      room: 'LAB-201',
      type: 'Practical',
      building: 'Academic Block B'
    },
    {
      time: '14:00 - 15:30',
      subject: 'Software Engineering',
      faculty: 'Dr. Emily Davis',
      room: 'SEM-301',
      type: 'Seminar',
      building: 'Academic Block A'
    }
  ];

  const upcomingAssignments = [
    {
      subject: 'Database Systems',
      title: 'SQL Query Assignment',
      dueDate: 'Mar 20, 2024',
      priority: 'High',
      status: 'Pending'
    },
    {
      subject: 'Operating Systems',
      title: 'Process Scheduling Report',
      dueDate: 'Mar 25, 2024',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      subject: 'Software Engineering',
      title: 'UML Diagrams',
      dueDate: 'Mar 30, 2024',
      priority: 'Low',
      status: 'Not Started'
    }
  ];

  const recentGrades = [
    {
      subject: 'Machine Learning',
      assignment: 'Mid-term Exam',
      grade: 'A',
      percentage: 87,
      date: 'Mar 10, 2024'
    },
    {
      subject: 'Database Systems',
      assignment: 'Lab Assignment 3',
      grade: 'A-',
      percentage: 82,
      date: 'Mar 8, 2024'
    },
    {
      subject: 'Operating Systems',
      assignment: 'Quiz 2',
      grade: 'B+',
      percentage: 78,
      date: 'Mar 5, 2024'
    }
  ];

  const quickActions = [
    {
      title: 'Download Timetable',
      icon: Download,
      action: 'download'
    },
    {
      title: 'View Grades',
      icon: Star,
      action: 'grades'
    },
    {
      title: 'Attendance Report',
      icon: Users,
      action: 'attendance'
    },
    {
      title: 'Course Materials',
      icon: BookOpen,
      action: 'materials'
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
          <h1 className="text-3xl font-bold">Hello, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            Semester {studentInfo.semester} • {user?.department}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter Schedule
          </Button>
          <Button variant="gradient" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Academic Stats */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-4 gap-6"
      >
        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
            <GraduationCap className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentInfo.cgpa}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <BookOpen className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentInfo.credits}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentInfo.attendance}%</div>
            <Progress value={studentInfo.attendance} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semester</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentInfo.semester}</div>
            <p className="text-xs text-muted-foreground">Spring 2024</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>
                    {format(new Date(), 'EEEE, MMMM dd, yyyy')}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Week
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((classItem, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        {index < todaySchedule.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {classItem.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {classItem.room}, {classItem.building}
                          </span>
                          <span>{classItem.faculty}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={
                      classItem.type === 'Lecture' ? 'default' :
                      classItem.type === 'Practical' ? 'secondary' : 
                      'outline'
                    }>
                      {classItem.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Assignments Due
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    <Badge 
                      variant={
                        assignment.priority === 'High' ? 'destructive' :
                        assignment.priority === 'Medium' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {assignment.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{assignment.subject}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Due: {assignment.dueDate}</span>
                    <Badge variant="outline" className="text-xs">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recent Grades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{grade.assignment}</p>
                    <p className="text-xs text-muted-foreground">{grade.subject}</p>
                    <p className="text-xs text-muted-foreground">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{grade.grade}</div>
                    <div className="text-xs text-muted-foreground">{grade.percentage}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="ghost" className="w-full justify-between" size="sm">
                  <span className="flex items-center gap-2">
                    <action.icon className="w-4 h-4" />
                    {action.title}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}