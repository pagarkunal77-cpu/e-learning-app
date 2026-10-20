import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { NotesViewer } from './components/NotesViewer';
import { VideoLearningCenter } from './components/VideoLearningCenter';
import { QuizCenter } from './components/QuizCenter';
import { FormulaSheets } from './components/FormulaSheets';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModal } from './components/AuthModal';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<'notes' | 'videos' | 'quizzes' | 'formulas' | 'dashboard'>('notes');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Strict 3-zone Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'notes' && (
          <>
            <HeroBanner onSelectTab={(tab) => setActiveTab(tab)} />
            <NotesViewer />
          </>
        )}

        {activeTab === 'videos' && (
          <VideoLearningCenter />
        )}

        {activeTab === 'quizzes' && (
          <QuizCenter />
        )}

        {activeTab === 'formulas' && (
          <FormulaSheets />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            onOpenNote={() => setActiveTab('notes')}
            onOpenVideoTab={() => setActiveTab('videos')}
            onOpenQuizTab={() => setActiveTab('quizzes')}
            openAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Quiet, Clean Engineering Footer (Section 1.B compliant) */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-display">EngiLearn</span>
            <span>·</span>
            <span>B.Tech & Engineering Undergrad Study System</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('notes')}
              className="hover:text-slate-900 transition-colors"
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className="hover:text-slate-900 transition-colors"
            >
              Lectures
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className="hover:text-slate-900 transition-colors"
            >
              Practice Quizzes
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className="hover:text-slate-900 transition-colors"
            >
              Formula Sheets
            </button>
          </div>
        </div>
      </footer>

      {/* Auth Modal for Login and Registration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
