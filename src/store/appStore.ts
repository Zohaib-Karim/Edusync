import { create } from 'zustand';
import type { 
  Subject, 
  Classroom, 
  Faculty, 
  Timetable, 
  TimetableEntry, 
  LeaveRequest, 
  Notification,
  AnalyticsData,
  Event 
} from '@/types';

interface AppState {
  // Data
  subjects: Subject[];
  classrooms: Classroom[];
  faculties: Faculty[];
  timetables: Timetable[];
  leaveRequests: LeaveRequest[];
  notifications: Notification[];
  events: Event[];
  analytics: AnalyticsData | null;

  // UI State
  sidebarOpen: boolean;
  currentTimetable: string | null;
  selectedDate: Date;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setCurrentTimetable: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  addSubject: (subject: Subject) => void;
  addClassroom: (classroom: Classroom) => void;
  addFaculty: (faculty: Faculty) => void;
  addTimetable: (timetable: Timetable) => void;
  updateTimetable: (id: string, entries: TimetableEntry[]) => void;
  addLeaveRequest: (request: LeaveRequest) => void;
  markNotificationAsRead: (id: string) => void;
  addEvent: (event: Event) => void;
  loadAnalytics: () => Promise<void>;
}

// Mock data
const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS201',
    credits: 4,
    department: 'Computer Science',
    semester: 3,
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Database Systems',
    code: 'CS301',
    credits: 4,
    department: 'Computer Science',
    semester: 5,
    color: '#8B5CF6'
  },
  {
    id: '3',
    name: 'Operating Systems',
    code: 'CS302',
    credits: 4,
    department: 'Computer Science',
    semester: 5,
    color: '#10B981'
  },
  {
    id: '4',
    name: 'Software Engineering',
    code: 'CS401',
    credits: 3,
    department: 'Computer Science',
    semester: 7,
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Machine Learning',
    code: 'CS402',
    credits: 4,
    department: 'Computer Science',
    semester: 7,
    color: '#EF4444'
  }
];

const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'LH-101',
    capacity: 60,
    type: 'lecture',
    building: 'Academic Block A',
    floor: 1,
    equipment: ['Projector', 'Whiteboard', 'AC'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'LAB-201',
    capacity: 30,
    type: 'lab',
    building: 'Academic Block B',
    floor: 2,
    equipment: ['Computers', 'Projector', 'AC'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'SEM-301',
    capacity: 25,
    type: 'seminar',
    building: 'Academic Block A',
    floor: 3,
    equipment: ['Smart Board', 'Video Conferencing', 'AC'],
    isAvailable: true
  },
  {
    id: '4',
    name: 'AUD-001',
    capacity: 200,
    type: 'auditorium',
    building: 'Main Block',
    floor: 0,
    equipment: ['Sound System', 'Projector', 'Stage Lights'],
    isAvailable: true
  }
];

const mockFaculties: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Alice Smith',
    email: 'alice.smith@smartclass.edu',
    department: 'Computer Science',
    subjects: ['1', '2'],
    workload: 18,
    maxHours: 24,
    preferences: {
      timeSlots: ['09:00-10:30', '14:00-15:30'],
      classrooms: ['1', '3']
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Prof. Robert Johnson',
    email: 'robert.johnson@smartclass.edu',
    department: 'Computer Science',
    subjects: ['3', '4'],
    workload: 20,
    maxHours: 24,
    preferences: {
      timeSlots: ['10:30-12:00', '15:30-17:00'],
      classrooms: ['1', '2']
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@smartclass.edu',
    department: 'Computer Science',
    subjects: ['5'],
    workload: 16,
    maxHours: 24,
    preferences: {
      timeSlots: ['08:00-09:30', '13:00-14:30'],
      classrooms: ['2', '3']
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Timetable Updated',
    message: 'CS301 schedule has been modified for next week',
    type: 'info',
    userId: '3',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionUrl: '/timetable'
  },
  {
    id: '2',
    title: 'Leave Request Approved',
    message: 'Your leave request for March 15th has been approved',
    type: 'success',
    userId: '2',
    read: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Room Change Alert',
    message: 'LH-101 is temporarily unavailable. Classes moved to LH-102',
    type: 'warning',
    userId: '1',
    read: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  // Initial data
  subjects: mockSubjects,
  classrooms: mockClassrooms,
  faculties: mockFaculties,
  timetables: [],
  leaveRequests: [],
  notifications: mockNotifications,
  events: [],
  analytics: null,

  // UI State
  sidebarOpen: true,
  currentTimetable: null,
  selectedDate: new Date(),

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentTimetable: (id) => set({ currentTimetable: id }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  addSubject: (subject) => 
    set((state) => ({ subjects: [...state.subjects, subject] })),
  
  addClassroom: (classroom) => 
    set((state) => ({ classrooms: [...state.classrooms, classroom] })),
  
  addFaculty: (faculty) => 
    set((state) => ({ faculties: [...state.faculties, faculty] })),
  
  addTimetable: (timetable) => 
    set((state) => ({ timetables: [...state.timetables, timetable] })),
  
  updateTimetable: (id, entries) => 
    set((state) => ({
      timetables: state.timetables.map(t => 
        t.id === id ? { ...t, entries } : t
      )
    })),
  
  addLeaveRequest: (request) => 
    set((state) => ({ leaveRequests: [...state.leaveRequests, request] })),
  
  markNotificationAsRead: (id) => 
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    })),
  
  addEvent: (event) => 
    set((state) => ({ events: [...state.events, event] })),

  loadAnalytics: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const analytics: AnalyticsData = {
      classroomUtilization: [
        { classroomId: '1', utilization: 75, totalHours: 40, usedHours: 30 },
        { classroomId: '2', utilization: 60, totalHours: 40, usedHours: 24 },
        { classroomId: '3', utilization: 45, totalHours: 40, usedHours: 18 },
        { classroomId: '4', utilization: 30, totalHours: 40, usedHours: 12 },
      ],
      facultyWorkload: [
        { facultyId: '1', workload: 75, maxHours: 24, subjects: 2 },
        { facultyId: '2', workload: 83, maxHours: 24, subjects: 2 },
        { facultyId: '3', workload: 67, maxHours: 24, subjects: 1 },
      ],
      subjectDistribution: [
        { department: 'Computer Science', subjects: 5, totalHours: 96 },
        { department: 'Mathematics', subjects: 3, totalHours: 48 },
        { department: 'Physics', subjects: 2, totalHours: 32 },
      ],
      conflicts: [
        { type: 'Time Overlap', count: 2, severity: 'medium' },
        { type: 'Room Double Booking', count: 1, severity: 'high' },
        { type: 'Faculty Overload', count: 3, severity: 'low' },
      ]
    };
    
    set({ analytics });
  }
}));