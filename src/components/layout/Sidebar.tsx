import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Calendar,
  Users,
  Settings,
  Home,
  BookOpen,
  Building,
  ClipboardList,
  BarChart3,
  UserCheck,
  Bell,
  Clock,
  Map,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  url: string;
  icon: any;
  roles: string[];
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    roles: ['admin', 'faculty', 'student'],
  },
  {
    title: 'Timetable',
    url: '/timetable',
    icon: Calendar,
    roles: ['admin', 'faculty', 'student'],
  },
  {
    title: 'Schedule Management',
    url: '/schedule',
    icon: Clock,
    roles: ['admin', 'faculty'],
    children: [
      {
        title: 'Create Timetable',
        url: '/schedule/create',
        icon: Calendar,
        roles: ['admin'],
      },
      {
        title: 'Manage Events',
        url: '/schedule/events',
        icon: ClipboardList,
        roles: ['admin', 'faculty'],
      },
      {
        title: 'Leave Requests',
        url: '/schedule/leave',
        icon: UserCheck,
        roles: ['admin', 'faculty'],
      },
    ],
  },
  {
    title: 'Resources',
    url: '/resources',
    icon: Building,
    roles: ['admin', 'faculty'],
    children: [
      {
        title: 'Classrooms',
        url: '/resources/classrooms',
        icon: Building,
        roles: ['admin'],
      },
      {
        title: 'Faculty',
        url: '/resources/faculty',
        icon: Users,
        roles: ['admin'],
      },
      {
        title: 'Subjects',
        url: '/resources/subjects',
        icon: BookOpen,
        roles: ['admin'],
      },
    ],
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    title: 'Campus Map',
    url: '/map',
    icon: Map,
    roles: ['admin', 'faculty', 'student'],
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
    roles: ['admin', 'faculty', 'student'],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    roles: ['admin', 'faculty', 'student'],
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { user } = useAuthStore();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Schedule Management', 'Resources']);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupExpanded = (title: string) => expandedGroups.includes(title);
  
  const filteredItems = sidebarItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  const collapsed = !open;

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "72px" }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300 ease-in-out border-r bg-gradient-to-b from-background to-muted/20",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">SmartClass</h1>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
          </motion.div>
        )}
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent className="p-2">
        <motion.div
          variants={sidebarVariants}
          animate={collapsed ? "collapsed" : "expanded"}
          className="space-y-1"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
            >
              {item.children ? (
                <SidebarGroup>
                  <SidebarGroupLabel 
                    className={cn(
                      "flex items-center justify-between cursor-pointer hover:bg-accent rounded-md p-2 transition-colors",
                      collapsed && "justify-center"
                    )}
                    onClick={() => !collapsed && toggleGroup(item.title)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <motion.div
                        animate={{ rotate: isGroupExpanded(item.title) ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </SidebarGroupLabel>
                  
                  <AnimatePresence>
                    {(!collapsed && isGroupExpanded(item.title)) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <SidebarGroupContent className="ml-4 space-y-1">
                          <SidebarMenu>
                            {item.children
                              .filter(child => user?.role && child.roles.includes(user.role))
                              .map((child) => (
                                <SidebarMenuItem key={child.title}>
                                  <SidebarMenuButton asChild>
                                    <NavLink
                                      to={child.url}
                                      className={cn(
                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                                        isActive(child.url) && "bg-primary text-primary-foreground hover:bg-primary/90"
                                      )}
                                    >
                                      <child.icon className="h-4 w-4" />
                                      <span>{child.title}</span>
                                    </NavLink>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SidebarGroup>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-accent",
                          isActive(item.url) && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </motion.div>
          ))}
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}