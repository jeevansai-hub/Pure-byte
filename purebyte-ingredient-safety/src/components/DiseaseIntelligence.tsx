/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, DiseaseAssociation } from '../types';
import { Dna, Shield, Bug, Heart, LayoutGrid, Brain, EyeOff, ClipboardList } from 'lucide-react';
import { MOCK_DISEASES } from '../data/mockData';

interface DiseaseIntelligenceProps {
  setCurrentPage: (page: PageId) => void;
}

export default function DiseaseIntelligence({ setCurrentPage }: DiseaseIntelligenceProps) {
  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'endocrine': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'neurological': return <Bug className="w-5 h-5 text-[#00FFD1]" />;
      case 'cardiovascular': return <Heart className="w-5 h-5 text-red-400" />;
      case 'gastrointestinal': return <LayoutGrid className="w-5 h-5 text-yellow-400" />;
      default: return <Shield className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="w-full text-white pb-16 px-6 max-w-5xl mx-auto space-y-8 text-left pt-6">
      
      <div>
        <span className="text-rose-500 font-mono text-xs uppercase tracking-widest">BIOLOGICAL PATHWAY RELEASES</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">DISEASE PROPAGATION INTELLIGENCE</h2>
        <p className="text-xs text-slate-400 mt-2">
          PureByte aggregates clinical and epidemiological models, mapping molecular additives to chronic human physiological disorders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_DISEASES.map((dis, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-gradient-to-b from-[#101828]/95 to-[#0A1020]/95 border border-white/10 hover:border-[#FF5252]/30 transition-all shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                {getSystemIcon(dis.affectedSystem)}
                <h4 className="text-sm font-bold text-white leading-tight">{dis.diseaseName}</h4>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">SYS: {dis.affectedSystem}</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
              <span className="text-white font-semibold">Mechanism of Action:</span> {dis.mechanism}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-[10px] text-slate-500">
              <div>
                <span className="block text-[8px] text-slate-600 uppercase">Evidence Strength</span>
                <span className="font-bold text-emerald-400 uppercase">{dis.evidenceStrength} MATCH</span>
              </div>

              <div>
                <span className="block text-[8px] text-slate-600 uppercase">Culprit Additives</span>
                <span className="font-bold text-red-400 uppercase">
                  {dis.culpritIngredients.map(i => i.toUpperCase()).join(', ')}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-[#00FFD1]" />
          <span className="text-slate-400 leading-relaxed max-w-lg">
            Have custom allergies or metabolic targets? Adjust warnings instantly in your personal Healthcare profile.
          </span>
        </div>

        <button
          onClick={() => setCurrentPage('profile')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-black font-bold tracking-wider hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer whitespace-nowrap"
        >
          ADJUST WARNINGS
        </button>
      </div>

    </div>
  );
}
