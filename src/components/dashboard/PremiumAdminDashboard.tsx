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
  PieChart,
  Activity,
  Target,
  Zap,
  Globe
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
  Line,
  Area,
  AreaChart,
  Pie
} from 'recharts';
import { useAppStore } from '@/store/appStore';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#F59E0B', '#EF4444'];

export function PremiumAdminDashboard() {
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
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Mock enhanced analytics data
  const utilizationData = [
    { time: '8AM', utilization: 45, capacity: 100 },
    { time: '9AM', utilization: 78, capacity: 100 },
    { time: '10AM', utilization: 92, capacity: 100 },
    { time: '11AM', utilization: 88, capacity: 100 },
    { time: '12PM', utilization: 65, capacity: 100 },
    { time: '1PM', utilization: 82, capacity: 100 },
    { time: '2PM', utilization: 95, capacity: 100 },
    { time: '3PM', utilization: 87, capacity: 100 },
    { time: '4PM', utilization: 73, capacity: 100 },
    { time: '5PM', utilization: 45, capacity: 100 },
  ];

  const attendanceData = [
    { week: 'Week 1', attendance: 92, target: 95 },
    { week: 'Week 2', attendance: 88, target: 95 },
    { week: 'Week 3', attendance: 94, target: 95 },
    { week: 'Week 4', attendance: 91, target: 95 },
    { week: 'Week 5', attendance: 96, target: 95 },
    { week: 'Week 6', attendance: 89, target: 95 },
  ];

  const departmentData = [
    { name: 'Computer Science', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Mathematics', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'Physics', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Engineering', value: 20, color: '#F59E0B' },
  ];

  const stats = [
    {
      title: 'Classroom Utilization',
      value: '87%',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Building,
      color: 'text-blue-500',
      gradient: 'from-blue-500/10 to-blue-600/5'
    },
    {
      title: 'Faculty Efficiency',
      value: '94%',
      change: '+8% improvement',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-purple-500',
      gradient: 'from-purple-500/10 to-purple-600/5'
    },
    {
      title: 'Student Attendance',
      value: '92%',
      change: '+3% this week',
      changeType: 'positive' as const,
      icon: Target,
      color: 'text-green-500',
      gradient: 'from-green-500/10 to-green-600/5'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 'Excellent performance',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'text-orange-500',
      gradient: 'from-orange-500/10 to-orange-600/5'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold gradient-text">Analytics Hub</h1>
          <p className="text-muted-foreground text-lg">Real-time insights into your educational ecosystem</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass-effect border-0">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="gradient-primary shadow-glow">
            <Zap className="w-4 h-4 mr-2" />
            Generate Insights
          </Button>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`glass-effect border-0 shadow-elegant bg-gradient-to-br ${stat.gradient} hover:shadow-glow transition-all duration-500`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="glass-effect border-0">
                    Live
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">{stat.title}</h3>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Classroom Utilization Heatmap */}
        <motion.div variants={itemVariants}>
          <Card className="glass-effect border-0 shadow-elegant">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Classroom Utilization Heatmap
                  </CardTitle>
                  <CardDescription>Hourly capacity usage throughout the day</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={utilizationData}>
                  <defs>
                    <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilization" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#utilizationGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Faculty Workload Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="glass-effect border-0 shadow-elegant">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Department Distribution
                  </CardTitle>
                  <CardDescription>Faculty allocation across departments</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-sm font-medium">{dept.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{dept.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Student Attendance Trends */}
      <motion.div variants={itemVariants}>
        <Card className="glass-effect border-0 shadow-elegant">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Student Attendance Trends
                </CardTitle>
                <CardDescription>Weekly attendance patterns and targets</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="glass-effect border-0">
                  This Month
                </Button>
                <Button variant="ghost" size="sm" className="text-primary">
                  View Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[80, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Generate Timetable',
            description: 'Create optimized schedules',
            icon: Calendar,
            color: 'from-blue-500/10 to-blue-600/5',
            iconColor: 'text-blue-500'
          },
          {
            title: 'Faculty Management',
            description: 'Manage staff assignments',
            icon: Users,
            color: 'from-purple-500/10 to-purple-600/5',
            iconColor: 'text-purple-500'
          },
          {
            title: 'System Health',
            description: 'Monitor platform status',
            icon: Activity,
            color: 'from-green-500/10 to-green-600/5',
            iconColor: 'text-green-500'
          }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`glass-effect border-0 shadow-elegant bg-gradient-to-br ${action.color} hover:shadow-glow transition-all duration-500 cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color}`}>
                    <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}