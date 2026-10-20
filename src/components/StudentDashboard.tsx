import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ENGINEERING_NOTES } from '../data/engineeringData';
import { BranchId } from '../types';
import {
  GraduationCap,
  Award,
  Video,
  Bookmark,
  FileText,
  Trash2,
  Edit2,
  Check,
  BookOpen,
  Target
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenNote: (noteId: string) => void;
  onOpenVideoTab: () => void;
  onOpenQuizTab: () => void;
  openAuthModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenNote,
  onOpenVideoTab,
  onOpenQuizTab,
  openAuthModal
}) => {
  const { user, isAuthenticated, updateProfile, deletePersonalNote, toggleBookmark } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedBranch, setEditedBranch] = useState<BranchId>(user?.branch || 'CSE');
  const [editedSemester, setEditedSemester] = useState<number>(user?.semester || 4);
  const [editedCollege, setEditedCollege] = useState(user?.college || '');
  const [editedGoal, setEditedGoal] = useState(user?.targetGoal || '');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Student Profile & Progress Tracking
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Sign in or create a student profile to track video lecture milestones, record quiz score history, and save personal study notes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={openAuthModal}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({
      name: editedName,
      branch: editedBranch,
      semester: editedSemester,
      college: editedCollege,
      targetGoal: editedGoal
    });
    setIsEditing(false);
  };

  const bookmarkedNoteObjects = ENGINEERING_NOTES.filter(n =>
    user.bookmarkedNotes.includes(n.id)
  );

  const averageQuizScore =
    user.quizHistory.length > 0
      ? Math.round(
          user.quizHistory.reduce((acc, curr) => acc + curr.percentage, 0) /
            user.quizHistory.length
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Profile Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold font-display shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {user.name}
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditedName(user.name);
                      setEditedBranch(user.branch);
                      setEditedSemester(user.semester);
                      setEditedCollege(user.college);
                      setEditedGoal(user.targetGoal);
                      setIsEditing(true);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-600 rounded"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Zero-Pill Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="font-semibold text-blue-600">{user.branch}</span>
                <span aria-hidden="true">·</span>
                <span>Semester {user.semester}</span>
                <span aria-hidden="true">·</span>
                <span>{user.college}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                <Target className="w-3.5 h-3.5 text-blue-500" />
                <span>Goal: {user.targetGoal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Drawer */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Branch</label>
              <select
                value={editedBranch}
                onChange={e => setEditedBranch(e.target.value as BranchId)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="EEE">EEE</option>
                <option value="CE">CE</option>
                <option value="COMMON">1st Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Semester</label>
              <select
                value={editedSemester}
                onChange={e => setEditedSemester(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Target Exam Goal</label>
              <input
                type="text"
                value={editedGoal}
                onChange={e => setEditedGoal(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* High Level Quantitative Metrics (Section 1.D: Tabular Numerals) */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>Lectures Finished</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {user.completedLectures.length}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avg Quiz Accuracy</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {averageQuizScore}%
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Bookmarked Notes</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {user.bookmarkedNotes.length}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personal Notes</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {user.personalNotes.length}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Saved Bookmarks & Quiz History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookmarked Notes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600" />
              Saved Bookmarked Notes ({bookmarkedNoteObjects.length})
            </h3>
          </div>

          {bookmarkedNoteObjects.length > 0 ? (
            <div className="space-y-3">
              {bookmarkedNoteObjects.map(note => (
                <div
                  key={note.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500">
                      {note.branch} · Sem {note.semester} · {note.subjectName}
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {note.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenNote(note.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-white border border-slate-200 rounded hover:bg-blue-50"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => toggleBookmark(note.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              No notes bookmarked yet. Tap the bookmark icon on any syllabus note to save here.
            </div>
          )}
        </div>

        {/* Practice Quiz Performance Record */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              Recent Practice & Test History ({user.quizHistory.length})
            </h3>
            <button
              onClick={onOpenQuizTab}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Take Quiz
            </button>
          </div>

          {user.quizHistory.length > 0 ? (
            <div className="space-y-3">
              {user.quizHistory.slice(0, 5).map(qr => (
                <div
                  key={qr.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {qr.quizTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {qr.completedAt} · Score: {qr.score}/{qr.totalQuestions}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-xs font-bold text-blue-600 tabular-nums">
                      {qr.percentage}%
                    </div>
                    <div className="text-[10px] text-slate-400">Accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              No quizzes completed yet. Test your knowledge in the Practice Quizzes section!
            </div>
          )}
        </div>
      </div>

      {/* Personal Notes Notebook */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            My Personal Study Notebook ({user.personalNotes.length})
          </h3>
        </div>

        {user.personalNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.personalNotes.map(pn => (
              <div
                key={pn.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{pn.title}</h4>
                    <button
                      onClick={() => deletePersonalNote(pn.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded shrink-0"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                    {pn.content}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-200/60 font-mono">
                  {pn.createdAt}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            No personal notes recorded yet. Add notes while studying notes or watching video lectures!
          </div>
        )}
      </div>
    </div>
  );
};
