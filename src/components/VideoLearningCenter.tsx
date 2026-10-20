import React, { useState } from 'react';
import { VIDEO_LECTURES, SUBJECT_TABS } from '../data/engineeringData';
import { VideoLecture, BranchId, SubjectTag } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  ListOrdered,
  Search,
  Award
} from 'lucide-react';

export const VideoLearningCenter: React.FC = () => {
  const { user, markLectureCompleted, addPersonalNote, deletePersonalNote } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectTag | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLecture, setSelectedLecture] = useState<VideoLecture>(VIDEO_LECTURES[0]);
  const [activeTimestampSec, setActiveTimestampSec] = useState<number>(0);
  const [noteText, setNoteText] = useState('');
  const [noteTimestampStr, setNoteTimestampStr] = useState('00:00');

  const filteredLectures = VIDEO_LECTURES.filter(lec => {
    const matchesSubject = selectedSubject === 'ALL' || lec.subjectTag === selectedSubject;
    const matchesSearch =
      searchQuery === '' ||
      lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const isCompleted = user?.completedLectures.includes(selectedLecture.id);

  const handleJumpToChapter = (chapterSec: number, timeStr: string) => {
    setActiveTimestampSec(chapterSec);
    setNoteTimestampStr(timeStr);
  };

  const handleSaveInVideoNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addPersonalNote({
      videoId: selectedLecture.id,
      timestamp: noteTimestampStr,
      title: `${selectedLecture.subjectName} @ ${noteTimestampStr}`,
      content: noteText.trim()
    });
    setNoteText('');
  };

  const userVideoNotes = user?.personalNotes.filter(n => n.videoId === selectedLecture.id) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>Engineering Video Classroom</span>
            <span aria-hidden="true">·</span>
            <span>University & Research Faculty Lectures</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Interactive Engineering Video Lectures
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Master engineering concepts with synchronized timestamp chapters, in-video note taking, and syllabus tracking.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lectures or professors..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Subject Selector Tabs */}
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

      {/* Main Two-Zone Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Video Player + Chapters + Notes (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Box */}
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-800">
            <div className="relative w-full aspect-video bg-black">
              {selectedLecture.youtubeId ? (
                <iframe
                  key={`${selectedLecture.id}-${activeTimestampSec}`}
                  src={`https://www.youtube.com/embed/${selectedLecture.youtubeId}?autoplay=1&start=${activeTimestampSec}&rel=0`}
                  title={selectedLecture.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Play className="w-12 h-12 text-blue-500" />
                </div>
              )}
            </div>

            {/* Video Details Bar */}
            <div className="p-5 bg-slate-900 text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-medium mb-1">
                    <span>{selectedLecture.branch}</span>
                    <span aria-hidden="true">·</span>
                    <span>Semester {selectedLecture.semester}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedLecture.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedLecture.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedLecture.instructor} · <span className="text-slate-300">{selectedLecture.institution}</span>
                  </div>
                </div>

                {/* Mark as Completed Button */}
                <button
                  onClick={() => markLectureCompleted(selectedLecture.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Navigator */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              Synchronized Lecture Chapters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedLecture.chapters.map(chap => {
                const isActive = activeTimestampSec === chap.timeSec;
                return (
                  <button
                    key={chap.timeSec}
                    onClick={() => handleJumpToChapter(chap.timeSec, chap.timeFormatted)}
                    className={`text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-2">{chap.title}</span>
                    <span className="font-mono text-[11px] text-blue-600 shrink-0">
                      {chap.timeFormatted}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Takeaways & Exam Points */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-600" />
              Key Takeaways & University Exam Focus
            </h4>
            <ul className="space-y-2">
              {selectedLecture.keyTakeaways.map((point, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In-Video Interactive Timestamp Note Taker */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  In-Video Timestamped Notes
                </h4>
                <p className="text-xs text-slate-500">
                  Tag notes to specific moments in the lecture. Click any note to jump directly to that timestamp.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveInVideoNote} className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Timestamp:</span>
                <input
                  type="text"
                  value={noteTimestampStr}
                  onChange={e => setNoteTimestampStr(e.target.value)}
                  placeholder="mm:ss"
                  className="w-20 px-2 py-1 text-xs font-mono border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                />
                <span className="text-[11px] text-slate-400">
                  (select chapter above to sync or edit manually)
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Add a study remark, question, or formula reference..."
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save Note
                </button>
              </div>
            </form>

            {userVideoNotes.length > 0 ? (
              <div className="space-y-2">
                {userVideoNotes.map(vn => (
                  <div
                    key={vn.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {vn.timestamp && (
                          <button
                            onClick={() => {
                              const parts = vn.timestamp!.split(':').map(Number);
                              const sec = (parts[0] || 0) * 60 + (parts[1] || 0);
                              handleJumpToChapter(sec, vn.timestamp!);
                            }}
                            className="font-mono text-xs font-bold text-blue-600 bg-blue-100/70 hover:bg-blue-200 px-1.5 py-0.5 rounded transition-colors"
                          >
                            ▶ {vn.timestamp}
                          </button>
                        )}
                        <span className="text-xs font-bold text-slate-900">{vn.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {vn.content}
                      </p>
                    </div>
                    <button
                      onClick={() => deletePersonalNote(vn.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No notes added for this lecture yet.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Lecture Playlist & Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Course Playlist ({filteredLectures.length})
              </h4>
              <span className="text-xs text-slate-500">
                {user?.completedLectures.length || 0} completed
              </span>
            </div>

            <div className="space-y-3">
              {filteredLectures.map(lec => {
                const isSelected = selectedLecture.id === lec.id;
                const isDone = user?.completedLectures.includes(lec.id);

                return (
                  <div
                    key={lec.id}
                    onClick={() => {
                      setSelectedLecture(lec);
                      setActiveTimestampSec(0);
                      setNoteTimestampStr('00:00');
                    }}
                    className={`cursor-pointer rounded-lg p-3 border transition-all text-left flex gap-3 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={lec.thumbnail}
                        alt={lec.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded font-mono">
                        {lec.duration}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-0.5">
                        <span className="font-semibold text-blue-600">{lec.branch}</span>
                        <span>·</span>
                        <span>Sem {lec.semester}</span>
                        {isDone && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-auto" />
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {lec.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate mt-1">
                        {lec.instructor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
