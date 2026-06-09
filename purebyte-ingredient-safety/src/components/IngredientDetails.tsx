/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Ingredient } from '../types';
import { Dna, ShieldAlert, BookOpen, Layers, ArrowLeft, Check, HelpCircle, AlertTriangle } from 'lucide-react';

interface IngredientDetailsProps {
  setCurrentPage: (page: PageId) => void;
  ingredient: Ingredient;
  onSelectAlternative?: (sub: string) => void;
}

export default function IngredientDetails({ setCurrentPage, ingredient, onSelectAlternative }: IngredientDetailsProps) {
  const [copiedCitationIdx, setCopiedCitationIdx] = useState<number | null>(null);

  const copyCitation = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationIdx(idx);
    setTimeout(() => {
      setCopiedCitationIdx(null);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-emerald-400';
      case 'low': return 'text-cyan-300';
      case 'moderate': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-500 animate-pulse';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-5xl mx-auto space-y-8 text-left pt-6">
      
      {/* HEADER CONTROL RETRACE */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <button
          onClick={() => setCurrentPage('report')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> REVERT TO DETECTOR REPORT
        </button>

        <span className="text-[10px] font-mono text-slate-500">CHEMICAL NODE: {ingredient.id.toUpperCase()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: LAB PARAMETERS (5 Slots) */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl relative">
          
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">CHEMICAL CLASSIFICATION</span>
            <h2 className="text-xl font-black text-white mt-1 leading-tight">{ingredient.name}</h2>
            {ingredient.chemicalName && (
              <p className="text-[10px] font-mono text-[#00FFD1] mt-1">{ingredient.chemicalName}</p>
            )}
          </div>

          {/* Molecular Structure HUD Mock Canvas */}
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center select-none">
            <span className="text-[9px] font-mono text-slate-500 block mb-3">ATOMIC RING COORDINATES</span>
            
            <div className="relative h-32 flex items-center justify-center">
              {/* Simulated molecular organic branches using simple CSS & SVG */}
              <svg className="w-24 h-24 stroke-[#00E5FF] fill-none" viewBox="0 0 100 100">
                <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" strokeWidth="1.5" />
                <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
                <line x1="50" y1="15" x2="50" y2="0" strokeWidth="1.5" />
                <circle cx="50" cy="0" r="4" fill="#7B61FF" />
                <line x1="80" y1="68" x2="95" y2="78" strokeWidth="1.5" />
                <circle cx="95" cy="78" r="4" fill="#B517FF" />
                <line x1="20" y1="68" x2="5" y2="78" strokeWidth="1.5" />
                <circle cx="5" cy="78" r="4" fill="#00FFD1" />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 border-t border-white/5 pt-3 font-mono text-[10px] text-slate-400">
              <div>
                <span className="block text-[8px] text-slate-600">FORMULA</span>
                <span className="font-bold text-white leading-tight">{ingredient.molecularFormula || 'C12H18O2'}</span>
              </div>
              <div>
                <span className="block text-[8px] text-slate-600">MOL WEIGHT</span>
                <span className="font-bold text-white leading-tight">{ingredient.molecularWeight || '190.2 g/mol'}</span>
              </div>
            </div>
          </div>

          {/* Risk Level gauge */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Hazard Level Ratio</span>
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span>SCORE {ingredient.riskScore} / 100</span>
              <span className={getRiskColor(ingredient.riskLevel)}>{ingredient.riskLevel.toUpperCase()}</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#FF5252] transition-all" 
                style={{ width: `${ingredient.riskScore}%` }}
              />
            </div>
          </div>

        </div>

        {/* COLUMN B: HAZARDS, REFERENCES, CHRONIC RISKS (7 Slots) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Section 1: Chronic impact summary */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-mono text-[#00FFD1] uppercase tracking-wider block">Bio-Toxicological Report</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{ingredient.description}</p>
            
            <div className="pt-3">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Isolated Chronic Complications</label>
              <ul className="space-y-2">
                {ingredient.healthEffects.map((eff, i) => (
                  <li key={i} className="text-xs flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <span>{eff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Clinical references */}
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest">Medical Citations</h4>
            </div>

            <div className="space-y-2">
              {ingredient.clinicalCitations.map((cit, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 leading-normal max-w-[85%]">{cit}</span>
                  <button
                    onClick={() => copyCitation(cit, idx)}
                    className="px-2.5 py-1 rounded bg-[#00FFD1]/10 hover:bg-[#00FFD1]/30 text-[#00FFD1] text-[10px] transition-all cursor-pointer"
                  >
                    {copiedCitationIdx === idx ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Safe chemical alternatives */}
          {ingredient.alternatives && ingredient.alternatives.length > 0 && (
            <div className="p-6 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-2xl border border-emerald-500/10 space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">Safe Toxic-Free Bio-Replacements</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ingredient.alternatives.map((alt, idx) => (
                  <div key={idx} className="p-3 bg-black/30 border border-white/10 rounded-xl text-center flex flex-col justify-between">
                    <span className="text-xs font-bold text-white block leading-tight">{alt}</span>
                    <span className="text-[9px] font-mono text-emerald-400 mt-2 block">100% CLEAN APPROVED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
