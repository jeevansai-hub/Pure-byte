/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Camera, 
  Dna, 
  ShieldCheck, 
  Activity, 
  Brain, 
  Play, 
  ChevronRight, 
  Users, 
  Star, 
  TrendingUp, 
  Heart,
  FileSpreadsheet
} from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: PageId) => void;
  onQuickSimulate: (productId: string) => void;
}

export default function LandingPage({ setCurrentPage, onQuickSimulate }: LandingPageProps) {
  // Floating orb score interaction state
  const [orbScore, setOrbScore] = useState(88);
  const [hoveringOrb, setHoveringOrb] = useState(false);
  const [selectedDemoProduct, setSelectedDemoProduct] = useState('energy');
  const [demoStep, setDemoStep] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab3D] = useState<'molecule' | 'hud' | 'telemetry'>('molecule');

  // Trigger floating orb pulsation/fluctuation when idle
  useEffect(() => {
    if (!hoveringOrb) {
      const interval = setInterval(() => {
        setOrbScore((prev) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const next = prev + delta;
          return next > 100 ? 100 : next < 40 ? 40 : next;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [hoveringOrb]);

  const runDemoScan = () => {
    setDemoStep('scanning');
    setDemoLogs([]);
    
    const logs = [
      '📡 Activating AI Optical Capture Engine...',
      '🛰️ Standardizing spatial margins of chemical label...',
      '🔬 Extracting chemical text coordinates...',
      '🧠 Resolving chemical names against WHO, FDA, and EU Tox-Indices...',
      '🧬 Correlating hazard ratios with metabolic disease maps...',
      '✅ Diagnostics finished. Compiling visual Safety Index.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setDemoLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setDemoStep('done');
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <div className="w-full text-white pb-24 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FFD1]/10 border border-[#00E5FF]/20 text-[#00FFD1] text-xs font-mono tracking-widest uppercase animate-pulse">
            <SparkleIcon className="w-4 h-4" /> Next-Gen Chemical Defenses
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white font-sans">
            Scan. Analyze.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#B517FF]">
              Stay Purely Safe.
            </span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
            PureByte activates biological and chemical intelligence to analyze ingredients in food, cosmetics, and household essentials. Extract molecular hazards instantly with biometric AI OCR.
          </p>

          {/* Action Deck */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              id="hero-scan-cta"
              onClick={() => setCurrentPage('scan')}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#B517FF] hover:from-[#00FFD1] hover:to-[#7B61FF] font-bold text-sm tracking-wide text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" /> Launch AI Scanner
            </button>
            <button
              id="hero-demo-cta"
              onClick={() => {
                const doc = document.getElementById('interactive-lab-demo');
                doc?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] font-semibold text-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" /> Watch Lab Simulation
            </button>
          </div>

          {/* Core Analytics Line */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-lg">
            <div>
              <div className="text-xl md:text-2xl font-black text-white font-mono">10,000+</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Chemicals Mapped</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-[#00FFD1] font-mono">99.8%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">OCR Accuracy</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-purple-400 font-mono">Real-time</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Risk Intel</div>
            </div>
          </div>
        </div>

        {/* 3D ORB DISPLAY (Apple Vision Pro/Iron Man Hologram HUD aesthetic) */}
        <div className="flex-1 w-full flex items-center justify-center relative py-12">
          {/* Circular Holographic Orbit Rings */}
          <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-white/5 animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />
          <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-[#7B61FF]/20 animate-spin pointer-events-none" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-[#00FFF1]/10 pointer-events-none" />

          {/* Interactive Core Orb HUD Container */}
          <div 
            className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full bg-[#050816]/60 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 group cursor-pointer shadow-2xl"
            onMouseEnter={() => setHoveringOrb(true)}
            onMouseLeave={() => setHoveringOrb(false)}
            onClick={() => {
              setOrbScore(Math.floor(Math.random() * 80) + 20);
            }}
          >
            {/* Dynamic visual aura depending on score */}
            <div 
              className={`absolute inset-[-15px] rounded-full opacity-30 transition-all blur-2xl group-hover:opacity-50 ${
                orbScore >= 80 ? 'bg-[#00E676]' : orbScore >= 50 ? 'bg-[#FFC400]' : 'bg-[#FF5252]'
              }`} 
            />

            {/* Glowing neon SVG ring */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx={typeof window !== 'undefined' && window.innerWidth < 768 ? '90' : '120'}
                cy={typeof window !== 'undefined' && window.innerWidth < 768 ? '90' : '120'}
                r={typeof window !== 'undefined' && window.innerWidth < 768 ? '80' : '108'}
                className="stroke-white/[0.04] fill-none"
                strokeWidth="6"
              />
              <circle
                cx={typeof window !== 'undefined' && window.innerWidth < 768 ? '90' : '120'}
                cy={typeof window !== 'undefined' && window.innerWidth < 768 ? '90' : '120'}
                r={typeof window !== 'undefined' && window.innerWidth < 768 ? '80' : '108'}
                className="fill-none transition-all duration-700"
                strokeWidth="8"
                strokeDasharray="678"
                strokeDashoffset={678 - (678 * orbScore) / 100}
                strokeLinecap="round"
                stroke={orbScore >= 80 ? '#00E676' : orbScore >= 50 ? '#FFC400' : '#FF5252'}
              />
            </svg>

            {/* Central Intelligence Content */}
            <Activity className="w-5 h-5 text-slate-400 group-hover:text-[#00FFD1] transition-all" />
            <span className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white mt-1">
              {orbScore}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#00FFD1] uppercase mt-1">
              Safety Score
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 italic group-hover:text-white transition-colors">
              Click to Retune
            </span>
          </div>

          {/* Telemetry labels layered dynamically around orb */}
          <div className="absolute top-[10%] left-[5%] md:left-[15%] p-3 rounded-xl bg-[#0F172A]/80 border border-[#7B61FF]/20 text-xs text-left max-w-[140px] pointer-events-none hidden sm:block">
            <span className="text-[10px] font-mono text-[#00FFD1] block">STABILITY: EXCELLENT</span>
            <p className="text-[11px] text-slate-300 mt-1">No toxic agents detected in cell test</p>
          </div>

          <div className="absolute bottom-[15%] right-0 md:right-[10%] p-3 rounded-xl bg-[#0F172A]/80 border border-red-500/20 text-xs text-left max-w-[150px] pointer-events-none hidden sm:block">
            <span className="text-[10px] font-mono text-red-400 block">WARNING INDEX: HIGH</span>
            <p className="text-[11px] text-slate-300 mt-1">Cosmetic carcinogen database sync complete</p>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN BENTO CORE FEATURES SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00FFD1] font-mono text-[11px] uppercase tracking-widest">ADVANCED LABORATORY SUBSYSTEMS</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">Engineered for absolute regulatory and health precision.</h3>
          <p className="text-sm text-slate-400 mt-3">We consolidate toxicological, chemical, and epidemiological datasets into a streamlined interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-white">AI OCR Extraction</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Scan curved packaging glass, creased aluminum wrappers, or cardboard ingredient text. Instantly normalized.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors mt-6 uppercase tracking-wider flex items-center">
              Active Node <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center text-[#7B61FF] mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-white">Toxicology Maps</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Cross-referenced with European Chemicals Agency (ECHA), FDA restricted index, and California Prop 65 lists.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors mt-6 uppercase tracking-wider flex items-center">
              Active Node <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#B517FF]/10 flex items-center justify-center text-[#B517FF] mb-4 group-hover:scale-110 transition-transform">
                <Dna className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-white">Biological Mapping</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Analyze molecular pathways to isolate chronic endocrine disruption, genotoxicity indicators, and gut degradation.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors mt-6 uppercase tracking-wider flex items-center">
              Active Node <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center text-[#00FFD1] mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-white">Personal Proving</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Specify family allergy vectors, direct pregnancy filters, active cosmetic tolerances, and metabolic objectives.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors mt-6 uppercase tracking-wider flex items-center">
              Active Node <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>

        </div>
      </section>

      {/* LANDING INTERACTIVE DEMO (Satisfying "Interactive product demo" criteria) */}
      <section id="interactive-lab-demo" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-white/[0.01] rounded-3xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column A (Control Panel) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-[#00FFD1]">TEST ENVIRONMENT</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Simulate an Instant Chemical Scan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the engine's speed and depth. Select a physical product profile below to run the extraction simulation and view instant chemical grading.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setSelectedDemoProduct('energy')}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  selectedDemoProduct === 'energy' 
                    ? 'bg-gradient-to-r from-red-500/10 to-red-500/0 border-red-500/40 text-white' 
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">⚠️ Neon Rush Energy Drink</div>
                  <div className="text-[10px] text-slate-500 font-mono">Contains Red 40, Aspartame, Acidulators</div>
                </div>
                <span className="text-[10px] font-mono uppercase text-red-400">High Risk</span>
              </button>

              <button
                onClick={() => setSelectedDemoProduct('cosmetic')}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  selectedDemoProduct === 'cosmetic' 
                    ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/0 border-emerald-500/40 text-white' 
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">✨ Hydra-Shield Facial Moist</div>
                  <div className="text-[10px] text-slate-500 font-mono">Contains Silicon Dioxide, Xanthan Gel</div>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-400">Safe</span>
              </button>

              <button
                onClick={() => setSelectedDemoProduct('toothpaste')}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  selectedDemoProduct === 'toothpaste' 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/0 border-yellow-500/40 text-white' 
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">⚡ Titan-Clean Dental Toothpaste</div>
                  <div className="text-[10px] text-slate-500 font-mono">Contains Triclosan, SLES, Titanium Dioxide</div>
                </div>
                <span className="text-[10px] font-mono uppercase text-yellow-400">Critical Risk</span>
              </button>
            </div>

            <button
              onClick={runDemoScan}
              disabled={demoStep === 'scanning'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] hover:from-[#00FFD1] hover:to-[#B517FF] text-xs font-bold tracking-wider text-black font-mono transition-all uppercase cursor-pointer disabled:opacity-50"
            >
              {demoStep === 'scanning' ? 'Analyzing Atomic Sequences...' : 'Initialize AI Scanner Simulation'}
            </button>
          </div>

          {/* Column B (Terminal Readout Visualization) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden shadow-2xl">
              
              {/* Browser/HUD Window header */}
              <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5252]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00E676]" />
                  <span className="text-[10px] ml-2 font-mono text-slate-500 uppercase tracking-widest">PUREBYTE INTERACTIVE SHELL</span>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">STATUS: READY</span>
              </div>

              {/* Console Body */}
              <div className="p-5 font-mono text-left text-xs min-h-[280px] flex flex-col justify-between">
                
                {/* Simulated Laser Screen Swipes */}
                {demoStep === 'scanning' && (
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-bounce mt-10 blur-[1px]" />
                )}

                <div className="space-y-2">
                  <div className="text-slate-500">&gt; awaiting telemetry target...</div>
                  
                  {/* Extracted dynamic details */}
                  {selectedDemoProduct && (
                    <div className="text-yellow-400 mt-2">
                      Target Target: {selectedDemoProduct === 'energy' ? 'X-Volt Labs Energy Soda' : selectedDemoProduct === 'cosmetic' ? 'Aegis Hydra Barrier Hydration' : 'Radiant Oraltech Toothpaste System'}
                    </div>
                  )}

                  {/* Render streaming actions */}
                  {demoLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-300 animate-slide-in text-[11px]">
                      {log}
                    </div>
                  ))}
                </div>

                {/* Simulated outcome parameters */}
                {demoStep === 'done' && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-fade-in flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Analysis Verified</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {selectedDemoProduct === 'energy' 
                          ? 'D- Severe biochemical ratings due to Petroleum Red-40 & Neurotoxic Sweeteners.'
                          : selectedDemoProduct === 'cosmetic' 
                          ? 'A+ Excellent! Biodegradable compound elements entirely green.'
                          : 'F Fail. Carcinogenic ingredients Titanium Dioxide & Triclosan detected.'
                        }
                      </p>
                    </div>

                    <button
                      onClick={() => onQuickSimulate(selectedDemoProduct === 'energy' ? 'neon-energy' : selectedDemoProduct === 'cosmetic' ? 'glow-cream' : 'white-paste')}
                      className="px-3 py-1.5 rounded-lg bg-[#00FFD1]/20 hover:bg-[#00FFD1]/40 border border-[#00FFD1]/40 text-[#00FFD1] text-[10px] transition-all font-mono"
                    >
                      Inspect Report
                    </button>
                  </div>
                )}

                <div className="mt-6 border-t border-white/5 pt-3 flex items-center justify-between text-slate-600 text-[9px]">
                  <span>AI SUB-KERNEL: NEST v1.2</span>
                  <span>CORE: ASYNC SECURE TUNNEL</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* PRESTIGE TESTIMONIAL HEALTH LOG */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-white/5">
        <span className="text-[#7B61FF] font-mono text-[11px] uppercase tracking-widest">CLINICAL ENDORSEMENTS</span>
        <h3 className="text-3xl font-black text-white mt-1">Acclaimed by Toxicologists Worldwide</h3>
        <p className="text-slate-400 text-sm mt-2 mb-12">How real professionals make daily chemical selections.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-left space-y-4">
            <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /></div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "PureByte has changed how I consult patients on dermatological health. Analyzing the exact preservative compounds of a facial block takes seconds."
            </p>
            <div>
              <h5 className="text-xs font-bold text-white">Dr. Aris Vance</h5>
              <p className="text-[10px] text-slate-500">Associate Professor of Skin Pathology, Munich</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-left space-y-4">
            <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /></div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "I scanned my kids\' daily sports drink and isolated three petroleum food dyes banned in Sweden but approved in local outlets. Indispensable tool for healthy families."
            </p>
            <div>
              <h5 className="text-xs font-bold text-white">Melanie K.</h5>
              <p className="text-[10px] text-slate-500">Preventative Dietitian & Parent of Three</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-left space-y-4">
            <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /></div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "The ability to trace how Triclosan triggers severe thyroid degradation inside cell cultures makes PureByte extremely scientifically rigorous. Magnificent visual system."
            </p>
            <div>
              <h5 className="text-xs font-bold text-white">Dr. Evelyn Carter</h5>
              <p className="text-[10px] text-slate-500">Head of Chemistry, Bio-Defense Institute</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 pt-12 border-t border-white/10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 text-slate-500 text-xs">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Dna className="w-5 h-5 text-[#00FFD1]" />
            <span className="font-mono text-white text-md font-bold tracking-tight">PUREBYTE</span>
          </div>
          <p className="max-w-xs text-slate-400 text-[11px] leading-relaxed">
            Enterprise Chemical Safety and Bio-Hazard Defense System. Engineered utilizing next-generation OCR scanners.
          </p>
          <p className="text-[10px] text-slate-500">© 2026 PureByte Inc. All rights reserved.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-left">
          <div>
            <h6 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">Sub-Nodes</h6>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setCurrentPage('scan')} className="hover:text-white transition-colors">Digital Scanner</button></li>
              <li><button onClick={() => setCurrentPage('dashboard')} className="hover:text-white transition-colors">Command Dashboard</button></li>
              <li><button onClick={() => setCurrentPage('library')} className="hover:text-white transition-colors">Ingredient Library</button></li>
              <li><button onClick={() => setCurrentPage('chat')} className="hover:text-white transition-colors">Chemical AI Shell</button></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">Compliance</h6>
            <ul className="space-y-2 text-[11px]">
              <li><span className="hover:text-white transition-colors cursor-pointer">EU REACH Register</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">FDA Ingested Limits</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Proposition 65 Listing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">ECHA CoRAP Annex</span></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">Enterprise</h6>
            <ul className="space-y-2 text-[11px]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Lab Audits</span></li>
              <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition-colors">Subscription Plans</button></li>
              <li><button onClick={() => setCurrentPage('admin')} className="hover:text-white transition-colors">Scientific Login</button></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Sparkle helper icon
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    </svg>
  );
}
