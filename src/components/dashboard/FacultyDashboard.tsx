import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  MapPin,
  Bell,
  ChevronRight,
  Plus,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { format, addDays, startOfWeek } from 'date-fns';

export function FacultyDashboard() {
  const { user } = useAuthStore();
  const { subjects, classrooms, faculties } = useAppStore();
  const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date()));

  const faculty = faculties.find(f => f.email === user?.email);

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

  // Mock timetable data
  const weeklySchedule = [
    {
      day: 'Monday',
      date: format(addDays(selectedWeek, 0), 'MMM dd'),
      classes: [
        {
          time: '09:00 - 10:30',
          subject: 'Data Structures',
          room: 'LH-101',
          type: 'Lecture',
          students: 45
        },
        {
          time: '14:00 - 15:30',
          subject: 'Database Systems', 
          room: 'LAB-201',
          type: 'Practical',
          students: 30
        }
      ]
    },
    {
      day: 'Tuesday',
      date: format(addDays(selectedWeek, 1), 'MMM dd'),
      classes: [
        {
          time: '10:30 - 12:00',
          subject: 'Data Structures',
          room: 'LH-101',
          type: 'Tutorial',
          students: 25
        }
      ]
    },
    {
      day: 'Wednesday',
      date: format(addDays(selectedWeek, 2), 'MMM dd'),
      classes: [
        {
          time: '09:00 - 10:30',
          subject: 'Database Systems',
          room: 'LH-102',
          type: 'Lecture',
          students: 50
        },
        {
          time: '15:30 - 17:00',
          subject: 'Data Structures',
          room: 'LAB-201',
          type: 'Practical',
          students: 30
        }
      ]
    },
    {
      day: 'Thursday',
      date: format(addDays(selectedWeek, 3), 'MMM dd'),
      classes: [
        {
          time: '11:00 - 12:30',
          subject: 'Database Systems',
          room: 'SEM-301',
          type: 'Seminar',
          students: 20
        }
      ]
    },
    {
      day: 'Friday',
      date: format(addDays(selectedWeek, 4), 'MMM dd'),
      classes: [
        {
          time: '09:00 - 10:30',
          subject: 'Data Structures',
          room: 'LH-101',
          type: 'Lecture',
          students: 45
        }
      ]
    }
  ];

  const upcomingClasses = [
    {
      subject: 'Data Structures',
      time: '09:00 AM',
      room: 'LH-101',
      students: 45,
      date: 'Today'
    },
    {
      subject: 'Database Systems',
      time: '02:00 PM',
      room: 'LAB-201',
      students: 30,
      date: 'Today'
    },
    {
      subject: 'Data Structures',
      time: '10:30 AM',
      room: 'LH-101',
      students: 25,
      date: 'Tomorrow'
    }
  ];

  const workloadData = {
    current: faculty?.workload || 0,
    maximum: faculty?.maxHours || 24,
    subjects: faculty?.subjects.length || 0
  };

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
          <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[1]}</h1>
          <p className="text-muted-foreground">Here's your teaching schedule and upcoming classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Request Leave
          </Button>
          <Button variant="gradient" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Workload</CardTitle>
            <Clock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workloadData.current}h</div>
            <Progress value={(workloadData.current / workloadData.maximum) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {workloadData.current} of {workloadData.maximum} hours
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
            <BookOpen className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workloadData.subjects}</div>
            <p className="text-xs text-muted-foreground">
              Across {faculty?.department} department
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingClasses.filter(c => c.date === 'Today').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {upcomingClasses.filter(c => c.date === 'Today').reduce((acc, c) => acc + c.students, 0)} students total
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>
                    Week of {format(selectedWeek, 'MMM dd, yyyy')}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklySchedule.map((day, dayIndex) => (
                  <motion.div
                    key={day.day}
                    variants={itemVariants}
                    className="border rounded-lg p-4 hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{day.day}</h3>
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                      </div>
                      <Badge variant="outline">
                        {day.classes.length} class{day.classes.length !== 1 ? 'es' : ''}
                      </Badge>
                    </div>
                    
                    {day.classes.length > 0 ? (
                      <div className="space-y-3">
                        {day.classes.map((classItem, classIndex) => (
                          <div 
                            key={classIndex}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                              <div>
                                <p className="font-medium">{classItem.subject}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {classItem.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {classItem.room}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {classItem.students}
                                  </span>
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No classes scheduled</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{classItem.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{classItem.time}</span>
                        <span>•</span>
                        <span>{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{classItem.date}</p>
                    <p className="text-xs text-muted-foreground">{classItem.students} students</p>
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
              <Button variant="ghost" className="w-full justify-between" size="sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Full Calendar
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between" size="sm">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Submit Grades
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between" size="sm">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Manage Attendance
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between" size="sm">
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Request Substitute
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}