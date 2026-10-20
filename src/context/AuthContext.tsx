import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, QuizResult, PersonalNote, BranchId } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (details: {
    name: string;
    email: string;
    password: string;
    branch: BranchId;
    semester: number;
    college: string;
    targetGoal: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  quickDemoLogin: () => void;
  toggleBookmark: (noteId: string) => void;
  markLectureCompleted: (lectureId: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'completedAt'>) => void;
  addPersonalNote: (note: { noteId?: string; videoId?: string; timestamp?: string; title: string; content: string }) => void;
  deletePersonalNote: (id: string) => void;
  updateProfile: (details: Partial<User>) => void;
}

const DEFAULT_DEMO_USER: User = {
  id: 'usr-kunal-demo',
  name: 'Kunal Sharma',
  email: 'pagarkunal77@gmail.com',
  branch: 'CSE',
  semester: 4,
  college: 'National Institute of Technology (NIT)',
  targetGoal: 'GATE 2027 & Placement in Top Tech',
  enrolledCourses: ['cs-dsa', 'cs-os'],
  bookmarkedNotes: ['note-dsa-trees-graphs', 'note-os-concurrency-scheduling'],
  completedLectures: ['vid-dsa-avl-graphs'],
  quizHistory: [
    {
      id: 'qr-demo-1',
      quizId: 'quiz-dsa-gate',
      quizTitle: 'Data Structures & Algorithms: Trees & Graph Traversal Test',
      subjectName: 'Data Structures & Algorithms',
      branch: 'CSE',
      score: 5,
      totalQuestions: 6,
      percentage: 83.3,
      completedAt: 'Yesterday, 18:40',
      timeTakenSeconds: 580,
      userAnswers: []
    }
  ],
  personalNotes: [
    {
      id: 'pn-1',
      noteId: 'note-dsa-trees-graphs',
      title: 'AVL vs Red-Black Tree Exam Trick',
      content: 'AVL is strictly height-balanced (height ≤ 1.44 log n) so faster lookups. Red-Black is loosely balanced (height ≤ 2 log n) so faster insertions/deletions.',
      createdAt: '2 days ago'
    }
  ]
};

const STORAGE_KEY = 'engilearn_auth_user_session';
const REGISTERED_USERS_KEY = 'engilearn_registered_users_db';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !pass) {
      return { success: false, message: 'Please enter both email and password.' };
    }
    // Check registered accounts in localStorage
    try {
      const dbStr = localStorage.getItem(REGISTERED_USERS_KEY);
      const db: Array<User & { password?: string }> = dbStr ? JSON.parse(dbStr) : [];
      const match = db.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (match) {
        if (match.password && match.password !== pass) {
          return { success: false, message: 'Incorrect password entered.' };
        }
        const userObj: User = {
          id: match.id,
          name: match.name,
          email: match.email,
          branch: match.branch || 'CSE',
          semester: match.semester || 4,
          college: match.college || 'Engineering College',
          targetGoal: match.targetGoal || 'Semester Excellence',
          enrolledCourses: match.enrolledCourses || [],
          bookmarkedNotes: match.bookmarkedNotes || [],
          completedLectures: match.completedLectures || [],
          quizHistory: match.quizHistory || [],
          personalNotes: match.personalNotes || []
        };
        setUser(userObj);
        return { success: true };
      }

      // Default demo email matching or any valid email
      if (email.toLowerCase() === 'pagarkunal77@gmail.com' || email.toLowerCase().includes('demo') || email.includes('@')) {
        const demoUser: User = {
          ...DEFAULT_DEMO_USER,
          email: email,
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase())
        };
        setUser(demoUser);
        return { success: true };
      }

      return { success: false, message: 'Account not found. Please register an account.' };
    } catch {
      setUser(DEFAULT_DEMO_USER);
      return { success: true };
    }
  };

  const register = async (details: {
    name: string;
    email: string;
    password: string;
    branch: BranchId;
    semester: number;
    college: string;
    targetGoal: string;
  }): Promise<{ success: boolean; message?: string }> => {
    if (!details.name.trim() || !details.email.trim() || !details.password.trim()) {
      return { success: false, message: 'Please fill in all mandatory fields.' };
    }
    if (details.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
      const dbStr = localStorage.getItem(REGISTERED_USERS_KEY);
      const db: Array<User & { password?: string }> = dbStr ? JSON.parse(dbStr) : [];
      if (db.some(u => u.email.toLowerCase() === details.email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists. Please log in.' };
      }

      const newUser: User & { password?: string } = {
        id: 'usr-' + Date.now(),
        name: details.name.trim(),
        email: details.email.trim().toLowerCase(),
        password: details.password,
        branch: details.branch,
        semester: details.semester,
        college: details.college.trim() || 'Engineering Institute of Technology',
        targetGoal: details.targetGoal || 'GATE & Semester Exams',
        enrolledCourses: ['cs-dsa'],
        bookmarkedNotes: ['note-dsa-trees-graphs'],
        completedLectures: [],
        quizHistory: [],
        personalNotes: []
      };

      db.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(db));

      const { ...safeUser } = newUser;
      delete safeUser.password;
      setUser(safeUser as User);

      return { success: true };
    } catch {
      return { success: false, message: 'Failed to create account. Please retry.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = () => {
    setUser(DEFAULT_DEMO_USER);
  };

  const toggleBookmark = (noteId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.bookmarkedNotes.includes(noteId);
      const updated = exists
        ? prev.bookmarkedNotes.filter(id => id !== noteId)
        : [...prev.bookmarkedNotes, noteId];
      return { ...prev, bookmarkedNotes: updated };
    });
  };

  const markLectureCompleted = (lectureId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.completedLectures.includes(lectureId);
      const updated = exists
        ? prev.completedLectures.filter(id => id !== lectureId)
        : [...prev.completedLectures, lectureId];
      return { ...prev, completedLectures: updated };
    });
  };

  const saveQuizResult = (result: Omit<QuizResult, 'id' | 'completedAt'>) => {
    if (!user) return;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const fullResult: QuizResult = {
      ...result,
      id: 'qr-' + Date.now(),
      completedAt: formattedDate
    };

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        quizHistory: [fullResult, ...prev.quizHistory]
      };
    });
  };

  const addPersonalNote = (note: { noteId?: string; videoId?: string; timestamp?: string; title: string; content: string }) => {
    if (!user) return;
    const newNote: PersonalNote = {
      id: 'pn-' + Date.now(),
      ...note,
      createdAt: 'Just now'
    };
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        personalNotes: [newNote, ...prev.personalNotes]
      };
    });
  };

  const deletePersonalNote = (id: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        personalNotes: prev.personalNotes.filter(n => n.id !== id)
      };
    });
  };

  const updateProfile = (details: Partial<User>) => {
    if (!user) return;
    setUser(prev => (prev ? { ...prev, ...details } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        quickDemoLogin,
        toggleBookmark,
        markLectureCompleted,
        saveQuizResult,
        addPersonalNote,
        deletePersonalNote,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
