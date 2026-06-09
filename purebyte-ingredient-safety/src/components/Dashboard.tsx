/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product, UserProfile } from '../types';
import { 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  Clock, 
  ChevronRight, 
  Dna, 
  Search, 
  Grid, 
  Eye, 
  Sparkles,
  ArrowRightLeft,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  setCurrentPage: (page: PageId) => void;
  products: Product[];
  userProfile: UserProfile;
  onSelectProduct: (product: Product) => void;
}

export default function Dashboard({ setCurrentPage, products, userProfile, onSelectProduct }: DashboardProps) {
  const [watchlist, setWatchlist] = useState<string[]>(['aspartame', 'bha', 'titanium-dioxide']);

  // Extract statistics
  const scannedProducts = products.filter(p => p.scanned);
  const averageSafetyScore = Math.round(
    scannedProducts.reduce((acc, p) => acc + p.safetyScore, 0) / (scannedProducts.length || 1)
  );

  // Compute dangerous compounds count from scanned products
  const criticalCompoundsFound = scannedProducts.reduce((acc, p) => {
    const dangerousCount = p.ingredients.filter(ing => ing.riskLevel === 'critical' || ing.riskLevel === 'high').length;
    return acc + dangerousCount;
  }, 0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#00E676]';
    if (score >= 50) return 'text-[#FFC400]';
    return 'text-[#FF5252]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#00E676]/10 border-[#00E676]/20 text-[#00E676]';
    if (score >= 50) return 'bg-[#FFC400]/10 border-[#FFC400]/20 text-[#FFC400]';
    return 'bg-[#FF5252]/10 border-[#FF5252]/20 text-[#FF5252]';
  };

  return (
    <div className="w-full text-white pb-12 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6">
      
      {/* HEADER HERO BANNER & PULSE GRID */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#101828] to-[#0A1020] border border-white/10 relative overflow-hidden">
        
        {/* Animated matrix element overlay */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#7B61FF]/10 to-transparent pointer-events-none" />

        <div className="space-y-2 relative">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#00FFD1]/10 border border-[#00FFD1]/20 text-xs font-mono text-[#00FFD1] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-ping" />
            Core Synaptic HQ
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">HEALTH INTELLIGENCE RADAR</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            PureByte is active. Current sensitivity calibrator calibrated to <span className="text-[#00FFD1] font-mono">{userProfile.riskCalibration.toUpperCase()}</span>.
          </p>
        </div>

        {/* Global Safety Index Ring */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* SVG simple circle preview */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" className="stroke-white/5 fill-none" strokeWidth="4" />
              <circle 
                cx="32" 
                cy="32" 
                r="28" 
                className="stroke-[#00FFD1] fill-none" 
                strokeWidth="4" 
                strokeDasharray="175"
                strokeDashoffset={175 - (175 * averageSafetyScore) / 100}
              />
            </svg>
            <span className="text-lg font-black font-mono">{averageSafetyScore}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">HEALTH SAFETY INDEX</span>
            <span className="text-xs font-bold text-[#00FFD1]">Operational</span>
          </div>
        </div>

      </div>

      {/* CORE FOUR-COLUMN ANALYTICAL TELEMETRY DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#0A1020]/50 border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Weekly Scans</span>
            <span className="text-xl font-mono font-black">{scannedProducts.length} Items</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#0A1020]/50 border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Molecular Hazards</span>
            <span className="text-xl font-mono font-black">{criticalCompoundsFound} Detected</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#0A1020]/50 border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#7B61FF]/10 text-[#7B61FF]">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Tox-Indicators Avoided</span>
            <span className="text-xl font-mono font-black">{userProfile.lifestyleGoals.length} Rules active</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#0A1020]/50 border border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Allergies</span>
            <span className="text-xl font-mono font-black">{userProfile.allergies.length} Presets</span>
          </div>
        </div>

      </div>

      {/* DUAL AXIS GRID - RECENT SCANS & EXPOSURE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMN A: RECENT SCANS (Left 7 Slots) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-xs font-mono text-[#00FFD1] uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4" /> Lab Ingest Timeline
            </h4>
            <button 
              onClick={() => setCurrentPage('history')}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Analyze Complete Timeline <ChevronRight className="w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {scannedProducts.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-slate-500">
                <p>No product scan telemetry stored.</p>
                <button 
                  onClick={() => setCurrentPage('scan')}
                  className="mt-3 px-4 py-2 bg-[#00FFD1]/10 text-[#00FFD1] border border-[#00FFD1]/30 rounded-xl text-xs font-mono"
                >
                  Init Scan sequence
                </button>
              </div>
            ) : (
              scannedProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={prod.imageUrl || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=80&auto=format&fit=crop&q=80'} 
                      alt={prod.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover:text-[#00FFD1] transition-all">{prod.name}</h5>
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        {prod.brand} • {prod.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Tiny visual bar representing ingredient risk indicators count */}
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 block font-mono">CRITICAL CHIP</span>
                      <span className="text-xs text-rose-400 font-mono">
                        {prod.ingredients.filter(i => i.riskLevel === 'high' || i.riskLevel === 'critical').length} active
                      </span>
                    </div>

                    <div className={`px-3 py-1.5 rounded-xl border text-xs font-black font-mono ${getScoreBg(prod.safetyScore)} shadow`}>
                      {prod.safetyScore}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN B: COmPOUND WATCHLIST & EXPOSURE LEVEL (Right 5 Slots) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Hazard Watchlist
            </h4>
            <span className="text-[10px] font-mono text-slate-500">REALTIME MONITORING</span>
          </div>

          <div className="space-y-3 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
            
            {/* SVG Visual Risk Matrix Area */}
            <div className="p-2 border border-white/5 rounded-xl bg-black/20 text-center">
              <span className="text-[9px] font-mono text-slate-500 block mb-2">INTELLIGENCE PROPAGATION RATIOS</span>
              
              {/* Draw a gorgeous SVG Radar / Grid wave showing daily molecular danger waves */}
              <svg className="w-full h-24 stroke-[#00FFD1] fill-none" viewBox="0 0 200 60">
                <path d="M 0 45 Q 25 15, 50 35 T 100 20 T 150 48 T 200 40" strokeWidth="1.5" className="opacity-80" />
                <path d="M 0 45 Q 25 15, 50 35 T 100 20 T 150 48 T 200 40 L 200 60 L 0 60 Z" fill="url(#grad2)" opacity="0.1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Individual Compounds watchlist elements */}
            <div className="space-y-2">
              {[
                { name: 'Aspartame', risk: 'High', code: 'E951', count: 1 },
                { name: 'BHA Preservatives', risk: 'Critical', code: 'E320', count: 2 },
                { name: 'Titanium Dioxide', risk: 'High', code: 'E171', count: 1 }
              ].map((watchItem, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <div>
                      <span className="font-bold text-white">{watchItem.name}</span>
                      <span className="text-[9px] text-slate-500 ml-2">({watchItem.code})</span>
                    </div>
                  </div>
                  <span className="text-[#FF5252] text-[10px] uppercase font-bold">{watchItem.risk}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* RECOMMENDED CLEAN REPLACEMENTS GRID */}
      <div>
        <div className="border-b border-white/5 pb-2 mb-4">
          <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Recommended Bio-Shield Items
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.safetyScore >= 80).slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="p-4 rounded-xl bg-gradient-to-tr from-[#00E676]/5 to-transparent border border-[#00E676]/10 hover:border-[#00E676]/35 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <h5 className="text-xs font-mono text-[#00E676] uppercase tracking-wider mb-2">CLEAN CERTIFIED</h5>
                <h4 className="text-sm font-bold text-white group-hover:text-[#00FFD1] transition-all">{prod.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1">Zero dangerous colors, emulsifiers, or endocrine active surfactants.</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px] font-mono">
                <span className="text-slate-500">{prod.brand}</span>
                <span className="text-[#00E676] font-bold">Score {prod.safetyScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
