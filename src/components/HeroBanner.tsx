import React from 'react';
import { BookOpen, Video, HelpCircle, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onSelectTab: (tab: 'notes' | 'videos' | 'quizzes' | 'formulas') => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Image with Measured Scrim for WCAG contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_engineering_workspace_1792472653506.jpg"
          alt="Engineering student workstation with schematics and laptop"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="max-w-3xl">
          {/* Clean Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-400 mb-3 tracking-wide">
            <span>Chemistry</span>
            <span aria-hidden="true">·</span>
            <span>Physics</span>
            <span aria-hidden="true">·</span>
            <span>Mathematics</span>
            <span aria-hidden="true">·</span>
            <span>Engg Graphics</span>
            <span aria-hidden="true">·</span>
            <span>FEE</span>
            <span aria-hidden="true">·</span>
            <span>CP (C Lang)</span>
            <span aria-hidden="true">·</span>
            <span>Python</span>
            <span aria-hidden="true">·</span>
            <span>Core B.Tech</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Complete Engineering E-Learning, High-Yield Notes & Quizzes
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Designed specifically for engineering undergrads. Access comprehensive topic breakdowns for Physics, Chemistry, Math, Engineering Graphics, FEE, C, and Python, complete with solved numericals, video lectures with chapter markers, and mock quizzes.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('notes')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Notes</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
            <button
              onClick={() => onSelectTab('videos')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Video Lectures</span>
            </button>
            <button
              onClick={() => onSelectTab('quizzes')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Test Your Knowledge</span>
            </button>
          </div>
        </div>

        {/* 4-Column Metric Strip (adhering to Section 5: full-width row below hero) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">06</div>
            <div className="text-xs text-slate-400 mt-1">Core B.Tech Branches</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-1">Verified Formulas & Derivations</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">48+</div>
            <div className="text-xs text-slate-400 mt-1">Video Chapters & Transcripts</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">GATE / Univ</div>
            <div className="text-xs text-slate-400 mt-1">Standard Practice Sets</div>
          </div>
        </div>
      </div>
    </div>
  );
};
