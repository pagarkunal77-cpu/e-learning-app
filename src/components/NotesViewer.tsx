import React, { useState } from 'react';
import { ENGINEERING_NOTES, SUBJECT_TABS } from '../data/engineeringData';
import { NoteItem, BranchId, SubjectTag } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Download,
  Copy,
  Check,
  FileCode,
  Calculator,
  AlertCircle,
  X,
  Share2,
  Plus,
  Trash2
} from 'lucide-react';

export const NotesViewer: React.FC = () => {
  const { user, toggleBookmark, addPersonalNote, deletePersonalNote } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectTag | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [marginNotesOpen, setMarginNotesOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter notes
  const filteredNotes = ENGINEERING_NOTES.filter(note => {
    const matchesSubject = selectedSubject === 'ALL' || note.subjectTag === selectedSubject;
    const matchesSearch =
      searchQuery === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.keyTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleDownloadNote = (note: NoteItem) => {
    let md = `# ${note.title}\n`;
    md += `Subject: ${note.subjectName} (${note.branch} · Semester ${note.semester})\n`;
    md += `Estimated Reading Time: ${note.readTime}\n\n`;
    md += `## Summary\n${note.summary}\n\n`;

    if (note.formulas.length > 0) {
      md += `## Key Formulas & Relations\n`;
      note.formulas.forEach(f => {
        md += `### ${f.label}\n`;
        md += `Formula: ${f.formula}\n`;
        md += `Explanation: ${f.explanation}\n\n`;
      });
    }

    note.sections.forEach(sec => {
      md += `## ${sec.title}\n\n${sec.content}\n\n`;
      if (sec.codeSnippet) {
        md += `\`\`\`${sec.codeSnippet.language}\n${sec.codeSnippet.code}\n\`\`\`\n\n`;
      }
      if (sec.practiceNumerical) {
        md += `### Practice Numerical Problem\n`;
        md += `**Problem:** ${sec.practiceNumerical.problem}\n\n`;
        md += `**Solution:** ${sec.practiceNumerical.solution}\n\n`;
        md += `**Steps:**\n`;
        sec.practiceNumerical.steps.forEach((s, idx) => {
          md += `${idx + 1}. ${s}\n`;
        });
        md += `\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.id}-engineering-notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddPersonalMarginNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !activeNote) return;
    addPersonalNote({
      noteId: activeNote.id,
      title: newNoteTitle.trim() || `${activeNote.subjectName} Revision Note`,
      content: newNoteContent.trim()
    });
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const relatedPersonalNotes = user?.personalNotes.filter(n => n.noteId === activeNote?.id) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>Engineering Syllabus Modules</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Technical Notes</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            B.Tech Semester Notes & Formula Handbooks
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Complete syllabus notes with mathematical derivations, code samples, solved university exam numericals, and export options.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, formulas, algorithms..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Subject Filter Tabs (Interactive Filter Controls - Section 1.A compliant) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg overflow-x-auto mb-8">
        {SUBJECT_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedSubject(tab.id as SubjectTag | 'ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
              selectedSubject === tab.id
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => {
          const isBookmarked = user?.bookmarkedNotes.includes(note.id);
          return (
            <div
              key={note.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Zero-Pill Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                  <span className="font-semibold text-blue-600">{note.branch}</span>
                  <span aria-hidden="true">·</span>
                  <span>Semester {note.semester}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {note.summary}
                </p>

                {/* Key Topics List */}
                <div className="space-y-1 mb-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Topics
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {note.keyTopics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="truncate">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                <button
                  onClick={() => setActiveNote(note)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read Full Notes
                </button>

                <button
                  onClick={() => toggleBookmark(note.id)}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-slate-50 text-slate-500 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => handleDownloadNote(note)}
                  title="Download Markdown Note"
                  className="p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No notes found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your branch filter or search keywords.</p>
        </div>
      )}

      {/* Full Note Reader Modal */}
      {activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-blue-600">{activeNote.branch}</span>
                  <span aria-hidden="true">·</span>
                  <span>Semester {activeNote.semester}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeNote.subjectName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeNote.readTime}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">
                  {activeNote.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleBookmark(activeNote.id)}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    user?.bookmarkedNotes.includes(activeNote.id)
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {user?.bookmarkedNotes.includes(activeNote.id) ? 'Saved' : 'Bookmark'}
                  </span>
                </button>

                <button
                  onClick={() => handleDownloadNote(activeNote)}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export .md</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs flex items-center gap-1.5"
                  title="Share Note"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setActiveNote(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
                  aria-label="Close Note Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Note Reader Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Executive Summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Module Summary
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeNote.summary}
                </p>
              </div>

              {/* Formulas & Equation Matrix */}
              {activeNote.formulas.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    Essential Formulas & Equations
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {activeNote.formulas.map((f, i) => (
                      <div key={i} className="p-4 bg-slate-900 text-white rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between text-xs text-blue-400 font-medium mb-1">
                          <span>{f.label}</span>
                          <button
                            onClick={() => handleCopyCode(f.formula, 100 + i)}
                            className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            {copiedCodeIndex === 100 + i ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            Copy Formula
                          </button>
                        </div>
                        <div className="font-mono text-sm sm:text-base text-amber-300 py-1 my-1 overflow-x-auto">
                          {f.formula}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {f.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Sections */}
              {activeNote.sections.map((section, sIdx) => (
                <div key={section.id} className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    {section.title}
                  </h3>

                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950 text-slate-200">
                      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 text-blue-400" />
                          <span>{section.codeSnippet.language.toUpperCase()} Implementation</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(section.codeSnippet!.code, sIdx)}
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs"
                        >
                          {copiedCodeIndex === sIdx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                      {section.codeSnippet.explanation && (
                        <div className="px-4 py-2 text-xs bg-slate-900/60 text-slate-400 border-t border-slate-800/80">
                          Note: {section.codeSnippet.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Solved Numerical Problem */}
                  {section.practiceNumerical && (
                    <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                        <Calculator className="w-4 h-4 text-blue-600" />
                        <span>Solved University Exam Numerical</span>
                      </div>
                      <p className="text-xs font-medium text-slate-900">
                        {section.practiceNumerical.problem}
                      </p>
                      <div className="space-y-1.5 text-xs text-slate-700 pl-2 border-l-2 border-blue-400">
                        {section.practiceNumerical.steps.map((st, i) => (
                          <div key={i} className="font-mono text-[11px] leading-relaxed">
                            {st}
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded bg-blue-100/70 text-xs font-semibold text-blue-900">
                        Final Answer: {section.practiceNumerical.solution}
                      </div>
                    </div>
                  )}

                  {/* University Exam Tips */}
                  {section.examTips && section.examTips.length > 0 && (
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>University Exam High-Yield Tips</span>
                      </div>
                      <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                        {section.examTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Personal Study Notes Section */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      My Personal Notes on this Topic
                    </h4>
                    <p className="text-xs text-slate-500">
                      Take personal study notes while reading; saved automatically to your profile.
                    </p>
                  </div>
                  <button
                    onClick={() => setMarginNotesOpen(!marginNotesOpen)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{marginNotesOpen ? 'Hide Note Form' : 'Add Note'}</span>
                  </button>
                </div>

                {marginNotesOpen && (
                  <form onSubmit={handleAddPersonalMarginNote} className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                    <input
                      type="text"
                      value={newNoteTitle}
                      onChange={e => setNewNoteTitle(e.target.value)}
                      placeholder="Note Title / Key Reminder"
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <textarea
                      rows={3}
                      required
                      value={newNoteContent}
                      onChange={e => setNewNoteContent(e.target.value)}
                      placeholder="Type your notes, viva-voce questions, or reminder formulas here..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setMarginNotesOpen(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Save Note to Profile
                      </button>
                    </div>
                  </form>
                )}

                {relatedPersonalNotes.length > 0 ? (
                  <div className="space-y-2">
                    {relatedPersonalNotes.map(pn => (
                      <div key={pn.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-slate-900">{pn.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{pn.content}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{pn.createdAt}</div>
                        </div>
                        <button
                          onClick={() => deletePersonalNote(pn.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No notes created yet for this module.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
