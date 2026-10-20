import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Video, HelpCircle, FileText, User as UserIcon, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'notes' | 'videos' | 'quizzes' | 'formulas' | 'dashboard';
  setActiveTab: (tab: 'notes' | 'videos' | 'quizzes' | 'formulas' | 'dashboard') => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            setActiveTab('notes');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none group whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-blue-700 transition-colors">
            E
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
            Engi<span className="text-blue-600">Learn</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (4-5 single-line clean text links) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('notes')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Engineering Notes
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Video Lectures
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeTab === 'quizzes'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice Quizzes
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeTab === 'formulas'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Formula Sheets
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            My Dashboard
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-semibold text-slate-900 truncate max-w-[120px]">{user.name}</div>
                  <div className="text-slate-500">{user.branch} · Sem {user.semester}</div>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <p className="text-xs text-blue-600 mt-1">{user.branch} · Semester {user.semester}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    Student Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Sign In / Register
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setActiveTab('notes');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === 'notes' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Engineering Notes
          </button>
          <button
            onClick={() => {
              setActiveTab('videos');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === 'videos' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Lectures
          </button>
          <button
            onClick={() => {
              setActiveTab('quizzes');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === 'quizzes' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Practice Quizzes
          </button>
          <button
            onClick={() => {
              setActiveTab('formulas');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === 'formulas' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'
            }`}
          >
            <FileText className="w-4 h-4" />
            Formula Sheets
          </button>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            My Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
