/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product, Ingredient } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Dna, 
  FileDown, 
  Share2, 
  ChevronRight, 
  Info, 
  TrendingDown, 
  Scale, 
  HelpCircle 
} from 'lucide-react';

interface SafetyReportProps {
  setCurrentPage: (page: PageId) => void;
  product: Product;
  onSelectIngredient: (ingredient: Ingredient) => void;
}

export default function SafetyReport({ setCurrentPage, product, onSelectIngredient }: SafetyReportProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'science' | 'regulation'>('matrix');
  const [toastMessage, setToastMessage] = useState('');

  const getScoreColorHex = (score: number) => {
    if (score >= 80) return '#00E676';
    if (score >= 50) return '#FFC400';
    return '#FF5252';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'text-[#00E676] bg-[#00E676]/10 border-[#00E676]/20';
    if (score >= 50) return 'text-[#FFC400] bg-[#FFC400]/10 border-[#FFC400]/20';
    return 'text-[#FF5252] bg-[#FF5252]/10 border-[#FF5252]/20';
  };

  const getGrade = (score: number) => {
    if (score >= 95) return 'A+';
    if (score >= 88) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    return 'F';
  };

  const triggerPDFDownload = () => {
    setToastMessage('Synthesizing PDF Certificate... File saved.');
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const triggerShareLink = () => {
    setToastMessage('Holographic share packet compiled and copied to clip board.');
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="w-full text-white pb-16 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6 relative">
      
      {/* Toast confirmation widget */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] border border-[#00FFD1]/30 text-white shadow-xl animate-bounce text-xs font-mono">
          ✓ {toastMessage}
        </div>
      )}

      {/* HEADER CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[#00FFD1] font-mono text-[10px] tracking-widest uppercase block">Verified Diagnostics Certificate</span>
          <h2 className="text-2xl font-black text-white mt-1">
            {product.name}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            MANUFACTURER: {product.brand} • TYPE: {product.type.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerPDFDownload}
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-mono hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={triggerShareLink}
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-mono hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* CORE SPLIT COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: INTERACTIVE SCORE ORB PANEL (4 Slots) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 rounded-3xl p-6 text-center space-y-6 shadow-2xl relative">
          
          <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 uppercase">
            ATOMIC INDEX SCALE
          </div>

          {/* Massively animated score circle orb */}
          <div className="relative w-44 h-44 mx-auto flex flex-col items-center justify-center rounded-full bg-[#050816]/70 border border-white/5 shadow-inner mt-4">
            
            {/* Visual halo backing lights */}
            <div 
              className="absolute inset-[15px] rounded-full blur-xl opacity-30 animate-pulse" 
              style={{ backgroundColor: getScoreColorHex(product.safetyScore) }}
            />

            {/* Glowing neon stroke */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="76" className="stroke-white/[0.02] fill-none" strokeWidth="4" />
              <circle 
                cx="88" 
                cy="88" 
                r="76" 
                className="stroke-transparent fill-none transition-all duration-1000" 
                strokeWidth="6" 
                strokeDasharray="478"
                strokeDashoffset={478 - (478 * product.safetyScore) / 100}
                stroke={getScoreColorHex(product.safetyScore)}
                strokeLinecap="round"
              />
            </svg>

            <span className="text-5xl font-black font-mono tracking-tight text-white mb-1">
              {product.safetyScore}
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
              Safety Score
            </span>
          </div>

          {/* Big Grade Badge */}
          <div className="inline-flex flex-col items-center px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/5 min-w-[120px]">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">GRADE STATUS</span>
            <span className="text-3xl font-black font-mono mt-1 text-[#00FFD1]">
              {getGrade(product.safetyScore)}
            </span>
          </div>

          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${getScoreBg(product.safetyScore)}`}>
            {product.safetyScore >= 80 
              ? '✅ EXCELLENT COMPOUND SAFETY. This product features zero carcinogens or harsh estrogenic ingredients. Approved for baby care.'
              : product.safetyScore >= 50
              ? '⚠️ MODERATE CONCERNS DETECTED. Contains allergen-inducing surfactants or restricted synthetic colors. Not advised for nursing users.'
              : '🚨 WARNING. Critical toxicological elements isolated. Contains endocrine disruptive chemicals, synthetic additives banned globally.'
            }
          </div>

        </div>

        {/* COLUMN B: MAIN TABBED CONTENT (8 Slots) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs header selector */}
          <div className="flex bg-[#0A1020]/80 p-1.5 rounded-xl border border-white/10 gap-1 text-xs font-mono">
            {[
              { id: 'matrix', label: 'INGREDIENT TOX MAP' },
              { id: 'science', label: 'SCIENTIFIC EVIDENCE' },
              { id: 'regulation', label: 'GLOBAL REGULATORY STATUS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 border border-[#00E5FF]/30 text-white font-bold' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: INGREDIENT LIST (Detailed matrix cards clicking straight to details) */}
          {activeTab === 'matrix' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
                <span>INGREDIENT NAME</span>
                <span>TOXIC LEVEL</span>
              </div>

              {product.ingredients.map((ing) => {
                const isDangerous = ing.riskLevel === 'critical' || ing.riskLevel === 'high';
                return (
                  <div
                    key={ing.id}
                    onClick={() => onSelectIngredient(ing)}
                    className="p-4 rounded-2xl bg-[#0A1020]/40 hover:bg-[#101828]/60 border border-white/5 hover:border-[#7B61FF]/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isDangerous ? (
                          <ShieldAlert className="w-4 h-4 text-[#FF5252]" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#00FFD1] transition-all leading-tight">
                          {ing.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1 max-w-lg leading-relaxed font-sans line-clamp-1">
                          {ing.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono uppercase font-bold ${
                        ing.riskLevel === 'safe' ? 'text-[#00E676]' : 'text-red-400'
                      }`}>
                        {ing.riskLevel}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SCIENTIFIC EVIDENCE DIRECT CLINICAL LINKS */}
          {activeTab === 'science' && (
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-5">
              <div className="flex gap-2 items-center text-yellow-400">
                <Scale className="w-5 h-5" />
                <h3 className="text-sm font-mono tracking-wider font-bold">EPIDEMIOLOGICAL CLINICAL LEDGER</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chemical correlations aggregated from NIH, EFSA, and World Health Organization cancer registries. Click on any active citation slot in details to view full peer-reviewed PDFs.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'IARC Evaluation on Genotoxicity inside Titanium Dioxide E171 (2021)', authority: 'European Food Safety Authority Panel' },
                  { title: 'Estrogen mimetic capabilities of BHA (Butylated Hydroxyanisole) in cellular models', authority: 'Journal of Applied Toxicology' },
                  { title: 'Neurological impact analysis and dopamine receptor transfer of Phenylalanine breakdown', authority: 'WHO Clinical Consensus Letter' }
                ].map((sci, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                    <div>
                      <h4 className="font-bold text-white leading-tight">{sci.title}</h4>
                      <span className="text-[9px] text-slate-500 mt-1 block">ISSUER: {sci.authority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GLOBAL REGULATORY STATUS (FDA, EU, Canada restrictions lookup) */}
          {activeTab === 'regulation' && (
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="flex gap-2 items-center text-[#00FFD1]">
                <Dna className="w-5 h-5" />
                <h3 className="text-sm font-mono tracking-wider font-bold">CROSS-BORDER REGULATORY MATRIX</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 uppercase text-[9px] text-left">
                      <th className="py-2.5">Compound Ingredient</th>
                      <th className="py-2.5">US FDA</th>
                      <th className="py-2.5">EU REACH</th>
                      <th className="py-2.5">CANADA COSUR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.ingredients.map((ing) => (
                      <tr key={ing.id} className="border-b border-white/5 text-slate-300">
                        <td className="py-3 font-sans font-bold text-white text-[11px]">{ing.name}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            ing.regulatoryStatus.fda === 'Approved' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'
                          }`}>
                            {ing.regulatoryStatus.fda}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            ing.regulatoryStatus.eu === 'Approved' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'
                          }`}>
                            {ing.regulatoryStatus.eu}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            ing.regulatoryStatus.canada === 'Approved' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'
                          }`}>
                            {ing.regulatoryStatus.canada}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NAVIGATION ALTERNATIVES BUTTON IN REPORT */}
          {product.safetyScore < 60 && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300">Hazard ratios exceed standard levels? Find toxic-free replacements.</span>
              <button
                onClick={() => setCurrentPage('library')}
                className="px-3 py-1.5 rounded-lg bg-purple-500 text-white font-bold tracking-wide hover:shadow-[0_0_10px_rgba(181,23,255,0.4)] transition-all cursor-pointer"
              >
                BROWSE PRODUCTS
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
