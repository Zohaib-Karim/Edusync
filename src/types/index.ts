export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  verified: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  semester: number;
  color: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium';
  building: string;
  floor: number;
  equipment: string[];
  isAvailable: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  workload: number;
  maxHours: number;
  preferences: {
    timeSlots: string[];
    classrooms: string[];
  };
  avatar?: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface TimetableEntry {
  id: string;
  subjectId: string;
  facultyId: string;
  classroomId: string;
  timeSlotId: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'practical' | 'tutorial';
  semester: number;
  section?: string;
}

export interface Timetable {
  id: string;
  name: string;
  semester: number;
  academicYear: string;
  entries: TimetableEntry[];
  isActive: boolean;
  createdAt: Date;
  version: number;
}

export interface LeaveRequest {
  id: string;
  facultyId: string;
  date: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  substituteId?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  userId: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface AnalyticsData {
  classroomUtilization: {
    classroomId: string;
    utilization: number;
    totalHours: number;
    usedHours: number;
  }[];
  facultyWorkload: {
    facultyId: string;
    workload: number;
    maxHours: number;
    subjects: number;
  }[];
  subjectDistribution: {
    department: string;
    subjects: number;
    totalHours: number;
  }[];
  conflicts: {
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'exam' | 'workshop' | 'lecture' | 'event';
  classroomId: string;
  organizerId: string;
  attendees: string[];
  recurring?: boolean;
  color: string;
}