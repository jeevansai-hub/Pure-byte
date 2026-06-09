/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { Activity, ShieldCheck, Cpu, Dna, RefreshCw } from 'lucide-react';

interface AnalysisLoadingProps {
  setCurrentPage: (page: PageId) => void;
  onAnalysisFinish: () => void;
}

export default function AnalysisLoading({ setCurrentPage, onAnalysisFinish }: AnalysisLoadingProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const steps = [
    { label: 'Ingesting text string arrays...', desc: 'Normalizing raw optical tokens to standard chemical nomenclature indices.' },
    { label: 'Resolving global regulatory classifications...', desc: 'Compiling toxic profiles against WHO, EU REACH, and US FDA restrict ledgers.' },
    { label: 'Mapping chronic biological disease pathways...', desc: 'Correlating estrogen receptor mimics, genotoxicity matrices, and metabolic pathways.' },
    { label: 'Fine-tuning personal bio-shield allergen matches...', desc: 'Checking profile thresholds, allergy triggers, and nursing parameters.' },
    { label: 'Compiling PureByte Safety Index report...', desc: 'Generating visual risk dials and clean organic replacement vectors.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          // Complete analysis
          setTimeout(() => {
            onAnalysisFinish();
          }, 800);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [onAnalysisFinish, steps.length]);

  return (
    <div className="w-full flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-xl bg-[#0A1020]/90 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Pulsing aurora core background glow */}
        <div className="absolute inset-x-0 top-1/4 h-32 bg-gradient-to-r from-[#00E5FF]/20 via-[#7B61FF]/10 to-[#B517FF]/10 blur-3xl pointer-events-none" />

        <div className="text-center space-y-6">
          
          {/* Animated 3D molecule structure spinner logo */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#00FFD1]/30 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#7B61FF]/30 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Dna className="w-8 h-8 text-[#00FFD1] animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-widest text-[#00FFD1] font-mono">NEURAL REASONING ACTIVE</h3>
            <p className="text-xs text-slate-400">PureByte is mapping the biological safety of ingested ingredients...</p>
          </div>

          {/* Stepped Timeline */}
          <div className="space-y-4 pt-4 text-left border-t border-white/5">
            {steps.map((s, idx) => {
              const active = idx === activeStepIdx;
              const completed = idx < activeStepIdx;
              return (
                <div 
                  key={idx} 
                  className={`flex gap-3 items-start transition-all duration-300 ${
                    active ? 'opacity-100 scale-102 font-bold' : completed ? 'opacity-60 font-medium' : 'opacity-25'
                  }`}
                >
                  <div className="mt-1">
                    {completed ? (
                      <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                    ) : active ? (
                      <RefreshCw className="w-4 h-4 text-[#00FFD1] animate-spin" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[8px] font-mono leading-none">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs text-white leading-tight">{s.label}</h5>
                    {active && <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-sans">{s.desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atomic ticker footer */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>COGNITIVE MATRIX: ACTIVE</span>
            <span>DIAGNOSTIC HASH: RX-709</span>
          </div>

        </div>

      </div>
    </div>
  );
}
