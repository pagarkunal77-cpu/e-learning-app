import React, { useState, useEffect } from 'react';
import { PRACTICE_QUIZZES, SUBJECT_TABS } from '../data/engineeringData';
import { Quiz, BranchId, SubjectTag } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  HelpCircle,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Calculator,
  ChevronRight,
  Award
} from 'lucide-react';

export const QuizCenter: React.FC = () => {
  const { saveQuizResult } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectTag | 'ALL'>('ALL');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  // Filter quizzes
  const filteredQuizzes = PRACTICE_QUIZZES.filter(q => {
    return selectedSubject === 'ALL' || q.subjectTag === selectedSubject;
  });

  // Start a quiz
  const handleStartQuiz = (quiz: Quiz, mode: 'practice' | 'exam') => {
    setActiveQuiz(quiz);
    setQuizMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setTimeLeftSec(quiz.durationMinutes * 60);
    setStartTime(Date.now());
  };

  // Timer countdown for exam mode
  useEffect(() => {
    if (!activeQuiz || isSubmitted || quizMode !== 'exam') return;

    const timer = setInterval(() => {
      setTimeLeftSec(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, isSubmitted, quizMode]);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted && quizMode === 'exam') return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIdx]: optionIdx
    }));
  };

  const handleToggleFlag = (idx: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz || isSubmitted) return;

    let correctCount = 0;
    const userAnswersList = activeQuiz.questions.map((q, idx) => {
      const selected = selectedAnswers[idx] ?? -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect
      };
    });

    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const percentage = Math.round((correctCount / activeQuiz.totalQuestions) * 1000) / 10;

    saveQuizResult({
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      subjectName: activeQuiz.subjectName,
      branch: activeQuiz.branch,
      score: correctCount,
      totalQuestions: activeQuiz.totalQuestions,
      percentage,
      timeTakenSeconds: elapsedSeconds,
      userAnswers: userAnswersList
    });

    setIsSubmitted(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate score summary
  const calculateScore = () => {
    if (!activeQuiz) return { score: 0, total: 0, percentage: 0 };
    let correct = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return {
      score: correct,
      total: activeQuiz.questions.length,
      percentage: Math.round((correct / activeQuiz.questions.length) * 100)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz Catalog View (when no active quiz) */}
      {!activeQuiz && (
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                <span>Adaptive Practice & Exam Simulator</span>
                <span aria-hidden="true">·</span>
                <span>GATE & University Standards</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Engineering Practice Quizzes & Mock Tests
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Test your conceptual grasp with curated multiple-choice questions, detailed explanations, and performance scorecards.
              </p>
            </div>
          </div>

          {/* Subject filter tabs */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <div
                key={quiz.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-600">{quiz.branch}</span>
                    <span aria-hidden="true">·</span>
                    <span>{quiz.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{quiz.totalQuestions} Questions</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {quiz.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-slate-400" />
                      {quiz.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      {quiz.subjectName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleStartQuiz(quiz, 'practice')}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
                  >
                    Practice Mode (Instant Feedback)
                  </button>
                  <button
                    onClick={() => handleStartQuiz(quiz, 'exam')}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center shadow-xs"
                  >
                    Exam Mode (Timed)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Active Quiz View */}
      {activeQuiz && (
        <div className="space-y-6">
          {/* Top Bar with Quiz Title & Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-600">{activeQuiz.branch}</span>
                <span aria-hidden="true">·</span>
                <span>{activeQuiz.subjectName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700">
                  {quizMode === 'practice' ? 'Practice Mode' : 'Exam Mode'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{activeQuiz.title}</h2>
            </div>

            <div className="flex items-center gap-3">
              {quizMode === 'exam' && !isSubmitted && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm font-semibold tabular-nums ${
                  timeLeftSec < 180 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  <Timer className="w-4 h-4" />
                  <span>{formatTimer(timeLeftSec)}</span>
                </div>
              )}

              <button
                onClick={() => setActiveQuiz(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg bg-slate-50"
              >
                Exit Quiz
              </button>
            </div>
          </div>

          {/* Results Scorecard (if submitted in Exam Mode or Finished) */}
          {isSubmitted ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quiz Completed!</h3>
                <p className="text-xs text-slate-500 mt-1">Here is your detailed performance breakdown.</p>

                <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                      {calculateScore().score}/{calculateScore().total}
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-blue-600 tabular-nums">
                      {calculateScore().percentage}%
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                      {activeQuiz.questions.length - calculateScore().score}
                    </div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Incorrect</div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleStartQuiz(activeQuiz, quizMode)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake Test
                  </button>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Back to All Quizzes
                  </button>
                </div>
              </div>

              {/* Comprehensive Question-by-Question Review */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-slate-900">
                  Comprehensive Question Analysis & Explanations
                </h4>
                {activeQuiz.questions.map((q, qIndex) => {
                  const userAnswer = selectedAnswers[qIndex];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-red-200 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-500">
                          Question {qIndex + 1} · {q.topic}
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 mb-3">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIndex) => {
                          const isPicked = userAnswer === optIndex;
                          const isAnswerKey = optIndex === q.correctIndex;
                          return (
                            <div
                              key={optIndex}
                              className={`p-2.5 rounded-lg text-xs font-mono border ${
                                isAnswerKey
                                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-bold'
                                  : isPicked
                                  ? 'bg-red-100/70 border-red-300 text-red-900 line-through'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {opt} {isAnswerKey && '✓ (Correct)'} {isPicked && !isAnswerKey && '✗ (Your choice)'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                        <span className="font-semibold text-blue-700">Explanation: </span>
                        <span>{q.explanation}</span>
                        {q.formulaRef && (
                          <div className="text-[11px] font-mono text-amber-700 pt-1">
                            Key Formula: {q.formulaRef}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Live Question Arena */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Question Card (8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
                {/* Question Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="text-xs font-semibold text-slate-500">
                    Question <span className="text-slate-900 font-mono font-bold">{currentQuestionIndex + 1}</span> of{' '}
                    <span className="font-mono">{activeQuiz.questions.length}</span>
                    <span className="ml-2 text-blue-600">· {activeQuiz.questions[currentQuestionIndex].topic}</span>
                  </div>
                  {quizMode === 'exam' && (
                    <button
                      onClick={() => handleToggleFlag(currentQuestionIndex)}
                      className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                        flaggedQuestions[currentQuestionIndex]
                          ? 'bg-amber-50 text-amber-700 border-amber-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Mark for Review'}
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {activeQuiz.questions[currentQuestionIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    const showPracticeFeedback =
                      quizMode === 'practice' && selectedAnswers[currentQuestionIndex] !== undefined;
                    const isCorrectAnswer = optIdx === activeQuiz.questions[currentQuestionIndex].correctIndex;

                    let optionStyle = 'border-slate-200 hover:border-blue-400 bg-white text-slate-800';
                    if (showPracticeFeedback) {
                      if (isCorrectAnswer) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected) {
                        optionStyle = 'border-red-400 bg-red-50 text-red-950';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-300 text-slate-500 bg-white'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <div className="font-mono text-xs sm:text-sm">{option}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Practice Mode Explanation */}
                {quizMode === 'practice' && selectedAnswers[currentQuestionIndex] !== undefined && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      {selectedAnswers[currentQuestionIndex] === activeQuiz.questions[currentQuestionIndex].correctIndex ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {activeQuiz.questions[currentQuestionIndex].explanation}
                    </p>
                    {activeQuiz.questions[currentQuestionIndex].formulaRef && (
                      <div className="text-[11px] font-mono text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                        Formula: {activeQuiz.questions[currentQuestionIndex].formulaRef}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Previous
                  </button>

                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1"
                    >
                      Next
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>

              {/* Question Navigation Palette (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Question Palette
                </h4>

                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
                  {activeQuiz.questions.map((_, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isFlagged = flaggedQuestions[idx];
                    const isCurrent = currentQuestionIndex === idx;

                    let btnClass = 'bg-slate-50 text-slate-700 border-slate-200';
                    if (isCurrent) {
                      btnClass = 'ring-2 ring-blue-500 font-bold';
                    }
                    if (isAnswered) {
                      btnClass += ' bg-blue-600 text-white border-blue-600';
                    } else if (isFlagged) {
                      btnClass += ' bg-amber-400 text-slate-950 font-bold border-amber-500';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all ${btnClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                    <span>Answered ({Object.keys(selectedAnswers).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                    <span>Flagged for Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block" />
                    <span>Unanswered ({activeQuiz.questions.length - Object.keys(selectedAnswers).length})</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                >
                  Submit & Finish Test
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
