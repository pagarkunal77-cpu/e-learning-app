export type BranchId = 'CSE' | 'ECE' | 'ME' | 'EEE' | 'CE' | 'COMMON';

export type SubjectTag =
  | 'CHEMISTRY'
  | 'PHYSICS'
  | 'MATHEMATICS'
  | 'GRAPHICS'
  | 'FEE'
  | 'CP'
  | 'PYTHON'
  | 'DSA'
  | 'OS'
  | 'DIGITAL'
  | 'THERMO'
  | 'CIRCUITS';

export interface Branch {
  id: BranchId;
  name: string;
  code: string;
  description: string;
  totalSubjects: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  branch: BranchId;
  semester: number;
  college: string;
  targetGoal: string;
  enrolledCourses: string[];
  bookmarkedNotes: string[];
  completedLectures: string[];
  quizHistory: QuizResult[];
  personalNotes: PersonalNote[];
}

export interface FormulaItem {
  label: string;
  formula: string;
  explanation: string;
  variables?: { symbol: string; meaning: string }[];
  subjectTag?: SubjectTag;
}

export interface NoteSection {
  id: string;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
  };
  practiceNumerical?: {
    problem: string;
    solution: string;
    steps: string[];
  };
  examTips?: string[];
}

export interface NoteItem {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectTag?: SubjectTag;
  branch: BranchId;
  semester: number;
  readTime: string;
  lastUpdated: string;
  summary: string;
  keyTopics: string[];
  formulas: FormulaItem[];
  sections: NoteSection[];
}

export interface VideoChapter {
  timeSec: number;
  timeFormatted: string;
  title: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectTag?: SubjectTag;
  branch: BranchId;
  semester: number;
  instructor: string;
  institution: string;
  duration: string;
  durationSeconds: number;
  videoUrl: string;
  youtubeId?: string;
  thumbnail: string;
  chapters: VideoChapter[];
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formulaRef?: string;
  topic: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectTag?: SubjectTag;
  branch: BranchId;
  difficulty: 'Foundation' | 'Core Semester' | 'GATE Standard';
  totalQuestions: number;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  subjectName: string;
  branch: BranchId;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeTakenSeconds: number;
  userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface PersonalNote {
  id: string;
  noteId?: string;
  videoId?: string;
  timestamp?: string;
  title: string;
  content: string;
  createdAt: string;
}
