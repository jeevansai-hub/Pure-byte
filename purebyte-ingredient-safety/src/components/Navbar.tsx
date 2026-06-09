/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Dna, 
  Grid, 
  Camera, 
  Search, 
  User, 
  MessageSquare, 
  Sliders, 
  Layers, 
  ShieldAlert, 
  Lock, 
  Compass, 
  Sparkles, 
  CreditCard, 
  Database, 
  FileText, 
  CheckSquare, 
  Clock, 
  RefreshCcw,
  Bell
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onRequestOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  onRequestOpenNotifications, 
  unreadNotificationsCount 
}: NavbarProps) {
  const [showSystemSelector, setShowSystemSelector] = useState(false);

  // Quick Access items in the primary central floating dock
  const quickAccessItems: { id: PageId; icon: React.ReactNode; label: string }[] = [
    { id: 'landing', icon: <Compass className="w-5 h-5" />, label: 'Discover' },
    { id: 'dashboard', icon: <Grid className="w-5 h-5" />, label: 'HQ' },
    { id: 'scan', icon: <Camera className="w-5 h-5 animate-pulse text-[#00FFD1]" />, label: 'Scan' },
    { id: 'library', icon: <Search className="w-5 h-5" />, label: 'Library' },
    { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: 'AI Assistant' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  // Complete list of 18 screens for the full testing suite (VisionOS Matrix view)
  const all17Pages: { id: PageId; label: string; group: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'landing', label: '1. Landing Page', group: 'Front', icon: <Compass className="w-4 h-4 text-[#00E5FF]" />, desc: 'Futuristic marketing, molecules & interactive safety orb' },
    { id: 'auth', label: '2. Authentication', group: 'Front', icon: <Lock className="w-4 h-4 text-pink-500" />, desc: 'Biometric fingerprint style glassmorphic login panel' },
    { id: 'onboarding', label: '3. Personal Onboarding', group: 'Front', icon: <Sparkles className="w-4 h-4 text-[#7B61FF]" />, desc: 'Multi-step questionnaire for allergies and health metrics' },
    
    { id: 'dashboard', label: '4. Command Dashboard', group: 'Console', icon: <Grid className="w-4 h-4 text-[#00FFD1]" />, desc: 'Active safety index, watchlists, risk ratios & dynamic pulse' },
    { id: 'scan', label: '5. Camera Scanner', group: 'Console', icon: <Camera className="w-4 h-4 text-[#00FFD1]" />, desc: 'Live holographic overlay, laser sweeps & active targeted OCR bounds' },
    { id: 'ocr-review', label: '6. OCR Text Review', group: 'Console', icon: <CheckSquare className="w-4 h-4 text-yellow-400" />, desc: 'Edit extracted lists, confidence tags & instant corrections' },
    { id: 'loading', label: '7. AI Analysis Loading', group: 'Console', icon: <RefreshCcw className="w-4 h-4 text-cyan-400" />, desc: 'Volumetric streaming reasoning steps & chemical lookup ticker' },
    
    { id: 'report', label: '8. Safety Report', group: 'Analysis', icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />, desc: 'Dynamic score, hazard matrices, clinical links & regulatory statuses' },
    { id: 'ingredient-details', label: '9. Chemical Details', group: 'Analysis', icon: <Dna className="w-4 h-4 text-purple-400" />, desc: 'Molecular structures, formulas, weights & global restrictions' },
    { id: 'disease-intel', label: '10. Disease Intelligence', group: 'Analysis', icon: <FileText className="w-4 h-4 text-rose-500" />, desc: 'Disease propagation logs & direct system-wide impact summaries' },
    { id: 'history', label: '11. Scan History', group: 'Analysis', icon: <Clock className="w-4 h-4 text-amber-500" />, desc: 'Personal timelines, dates, ratings & multi-scan comparison decks' },
    { id: 'library', label: '12. Product Library', group: 'Data', icon: <Search className="w-4 h-4 text-teal-400" />, desc: 'Search food, cosmetics, pharmaceuticals & compare rankings' },
    
    { id: 'profile', label: '13. Health Profile', group: 'Data', icon: <User className="w-4 h-4 text-blue-400" />, desc: 'Manage specific warnings, pregnancy toggle, or diet targets' },
    { id: 'chat', label: '14. AI Safety Chat', group: 'Data', icon: <MessageSquare className="w-4 h-4 text-[#00E5FF]" />, desc: 'Streamed chat replies, direct ingredient citations & safer alternative chips' },
    { id: 'pricing', label: '15. Premium Tier', group: 'Billing', icon: <CreditCard className="w-4 h-4 text-[#B517FF]" />, desc: 'Pro feature comparison grid matrix & animated pricing decks' },
    { id: 'admin', label: '16. Admin Lab Console', group: 'Billing', icon: <Database className="w-4 h-4 text-indigo-400" />, desc: 'Chemical registry editor, security audit ledger & core API logs' },
    { id: 'settings', label: '17. System Settings', group: 'Billing', icon: <Sliders className="w-4 h-4 text-slate-400" />, desc: 'Sensitivity calibrators, API hooks & storage data backups' },
  ];

  return (
    <>
      {/* Top Header Row */}
      <header className="sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#030611]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('landing')}>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#00E5FF] via-[#7B61FF] to-[#B517FF] p-[1.5px] shadow-lg shadow-[#7B61FF]/10">
            <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-[#00FFD1]" />
            </div>
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight text-white flex items-center gap-1">
              PURE<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]">BYTE</span>
            </h1>
            <p className="text-[10px] font-mono text-[#00FFD1]/70 uppercase tracking-widest leading-none">HEAlTH INTEL</p>
          </div>
        </div>

        {/* Global Action Triggers */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button 
            id="notif-bell-btn"
            onClick={onRequestOpenNotifications}
            className="relative w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] hover:border-white/20 transition-all text-white group"
          >
            <Bell className="w-4 h-4 transition-transform group-hover:scale-110" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-[8px] right-[8px] w-2 h-2 rounded-full bg-[#FF5252] animate-bounce shadow-[0_0_8px_#FF5252]" />
            )}
          </button>

          {/* Matrix Space Launcher Trigger */}
          <button 
            id="matrix-space-btn"
            onClick={() => setShowSystemSelector(!showSystemSelector)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 hover:from-[#00E5FF]/30 hover:to-[#7B61FF]/30 border border-[#00FFF1]/30 transition-all text-white font-mono text-xs cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.15)] animate-pulse"
          >
            <Layers className="w-4 h-4 text-[#00FFD1]" />
            <span className="hidden sm:inline">Suite Matrix ({all17Pages.length} Pages)</span>
          </button>
        </div>
      </header>

      {/* Primary Floating Central Dock (Tesla UI / Vision Pro style) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[560px] px-3 py-2 rounded-2xl bg-[#0A1020]/80 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-around gap-1">
        {quickAccessItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              id={`quick-nav-${item.id}`}
              onClick={() => {
                setCurrentPage(item.id);
                setShowSystemSelector(false);
              }}
              className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all cursor-pointer relative group ${
                isActive 
                  ? 'bg-gradient-to-b from-[#7B61FF]/20 to-[#B517FF]/20 border border-[#7B61FF]/30 text-white shadow-inner' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <span className="text-[10px] mt-1 font-sans font-medium tracking-wide">
                {item.label}
              </span>

              {/* Active Underglow Dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00FFD1] blur-[0.5px]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Holographic Suite Matrix Selector - Overarching visionOS experience */}
      {showSystemSelector && (
        <div className="fixed inset-0 z-40 bg-[#030611]/95 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-4xl bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,255,209,0.1)] relative">
            
            {/* Close Trigger */}
            <button 
              onClick={() => setShowSystemSelector(false)}
              className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all font-mono"
            >
              ✕ DISMISS INTERFACE
            </button>

            <div className="mb-6">
              <span className="font-mono text-xs text-[#00FFD1] uppercase tracking-widest">SYSTEM INTEGRATION DIAGRAM</span>
              <h3 className="text-2xl font-black text-white mt-1">PUREBYTE FULL SUITE MATRIX</h3>
              <p className="text-sm text-slate-400 mt-2">
                Click any of the 17 fully-interactive application contexts below. The entire system is hot-swappable to showcase live design flows.
              </p>
            </div>

            {/* Matrix Columns by Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Front', 'Console', 'Analysis', 'Data', 'Billing'].map((groupName) => {
                const groupPages = all17Pages.filter(p => p.group === groupName || (groupName === 'Billing' && (p.group === 'Billing' || p.group === 'Admin')));
                return (
                  <div key={groupName} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                      {groupName} Nodes
                    </h4>
                    <div className="space-y-2">
                      {groupPages.map((page) => {
                        const isCurrent = currentPage === page.id;
                        return (
                          <button
                            key={page.id}
                            id={`matrix-node-${page.id}`}
                            onClick={() => {
                              setCurrentPage(page.id);
                              setShowSystemSelector(false);
                            }}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group ${
                              isCurrent
                                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                                : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="p-2 rounded-lg bg-white/[0.04] group-hover:bg-[#00FFD1]/10 transition-colors">
                              {page.icon}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-[#00FFD1] transition-colors">
                                {page.label}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                                {page.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-center text-[10px] font-mono text-slate-500">
              PUREBYTE CORE ENGINE v4.8 • DIRECT RE-ENTRY MODULE PORT 3000
            </div>
          </div>
        </div>
      )}
    </>
  );
}
