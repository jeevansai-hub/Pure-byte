/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product } from '../types';
import { CheckSquare, AlertTriangle, Play, RefreshCw, Layers } from 'lucide-react';

interface OCRReviewProps {
  setCurrentPage: (page: PageId) => void;
  rawIngredientsText: string;
  selectedProductContext: Product;
  onCommitReview: (editedText: string) => void;
}

export default function OCRReview({
  setCurrentPage,
  rawIngredientsText,
  selectedProductContext,
  onCommitReview,
}: OCRReviewProps) {
  const [ingredientsText, setIngredientsText] = useState(rawIngredientsText);

  const handleCommit = () => {
    onCommitReview(ingredientsText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 text-left space-y-6">
      
      <div>
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest block">EXTRACTED CHEMICAL SEQUENCE REVIEW</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">CONFIRM OCR DETECTED STRINGS</h2>
        <p className="text-xs text-slate-400 mt-2">
          Verify the list of ingredients before issuing toxicological analysis orders. Unrecognized tokens have been auto-flagged below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: EDITABLE FIELD (7 Slots) */}
        <div className="md:col-span-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#050816]/70 p-5 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase">RAW OPTICAL TEXT INPUT</span>
              <span className="text-[#00FFD1] text-[10px] font-mono uppercase bg-[#00FFD1]/10 px-2.5 py-0.5 rounded">AUTO MATCHED DECK</span>
            </div>

            <textarea
              rows={8}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="w-full p-4 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all leading-relaxed"
            />

            <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
              <span>CHARACTERS: {ingredientsText.length}</span>
              <span>SYNTAX EXPORTS: FDA-REGULATED</span>
            </div>
          </div>
        </div>

        {/* COLUMN B: ENGINE PARAMETERS (4 Slots) */}
        <div className="md:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <h4 className="text-xs font-mono text-yellow-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Diagnostics Report
            </h4>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                <span>Standard Layout: Identified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                <span>Text Contrast Ratio: 12.4 (EXCELLENT)</span>
              </div>
              <div className="flex items-start gap-2 text-yellow-400">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Identified candidate compound: <strong className="text-white">Aspartame</strong> restricted index match.</span>
              </div>
            </div>

            <button
              onClick={handleCommit}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-yellow-400 to-[#FFC400] hover:from-[#00FFD1] hover:to-[#7B61FF] text-xs font-bold text-black font-mono tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,196,0,0.2)] cursor-pointer flex items-center justify-center gap-1.5"
            >
              RUN BIO TOX ANALYSIS <Play className="w-4 h-4 fill-black text-black" />
            </button>

            <button
              onClick={() => setCurrentPage('scan')}
              className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-[10px] font-mono tracking-wide text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> RE-INGEST PHOTO
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
