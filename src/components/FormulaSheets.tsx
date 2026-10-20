import React, { useState } from 'react';
import { FORMULA_CHEATSHEETS, SUBJECT_TABS } from '../data/engineeringData';
import { BranchId, SubjectTag } from '../types';
import { Search, Calculator, Copy, Check } from 'lucide-react';

export const FormulaSheets: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectTag | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const filteredCategories = FORMULA_CHEATSHEETS.filter(cat => {
    return selectedSubject === 'ALL' || cat.subjectTag === selectedSubject;
  }).map(cat => {
    const items = cat.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return (
        searchQuery === '' ||
        item.label.toLowerCase().includes(q) ||
        item.formula.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q)
      );
    });
    return { ...cat, items };
  }).filter(cat => cat.items.length > 0);

  const handleCopy = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>High-Yield Formula Compendium</span>
            <span aria-hidden="true">·</span>
            <span>Quick Semester & GATE Revision</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Engineering Formula Handbook & Cheat Sheets
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Search, copy, and review core mathematical formulas, recurrence equations, and circuit laws.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search formulas (e.g. Master, Laplace, Carnot)..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
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

      {/* Formula Category Sections */}
      <div className="space-y-8">
        {filteredCategories.map(cat => (
          <div key={cat.category} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">{cat.category}</h3>
              <span className="text-xs text-slate-500 ml-auto font-mono">
                {cat.items.length} formulas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item, idx) => {
                const uniqueKey = `${cat.category}-${idx}`;
                const isCopied = copiedIndex === uniqueKey;

                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        <button
                          onClick={() => handleCopy(item.formula, uniqueKey)}
                          className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors text-xs flex items-center gap-1"
                          title="Copy formula text"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 text-[11px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 my-2 bg-slate-900 rounded-lg text-amber-300 font-mono text-xs overflow-x-auto">
                        <code>{item.formula}</code>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
            <Calculator className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-700">No formulas matched</h3>
            <p className="text-xs text-slate-500 mt-1">Try another search term or branch category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
