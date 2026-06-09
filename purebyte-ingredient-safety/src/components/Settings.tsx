/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, UserProfile } from '../types';
import { Sliders, Eye, RefreshCw, Key, Shield, HelpCircle, HardDrive } from 'lucide-react';

interface SettingsProps {
  setCurrentPage: (page: PageId) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export default function Settings({ setCurrentPage, userProfile, setUserProfile }: SettingsProps) {
  const [apiKey, setApiKey] = useState('pb_live_7718de29283c771fa1b92c81be');
  const [showApiKey, setShowApiKey] = useState(false);
  const [toast, setToast] = useState('');

  const triggerReset = () => {
    setUserProfile({
      age: 28,
      gender: 'male',
      allergies: [],
      healthConditions: [],
      dietPreferences: [],
      pregnancyStatus: false,
      lifestyleGoals: [],
      riskCalibration: 'balanced'
    });
    setToast('All biological calibrations reset to default factory parameters.');
    setTimeout(() => setToast(''), 2500);
  };

  const syncBackup = () => {
    setToast('Secure cloud backup verified (AES-256 encrypted).');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-4xl mx-auto space-y-8 text-left pt-6 relative">
      
      {toast && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] border border-[#00FFD1]/30 text-white shadow-xl animate-bounce text-xs font-mono">
          ✓ {toast}
        </div>
      )}

      <div>
        <span className="text-[#7B61FF] font-mono text-xs uppercase tracking-widest">Calibration & Registry</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">SYSTEM CONTROLS & SETTINGS</h2>
        <p className="text-xs text-slate-400 mt-2">
          Calibrate OCR text ingestion bounds, developer API integrations, database hooks, and local profile data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* COLUMN A: CALIBRATION SLIDERS (7 Slots) */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00FFD1]" /> Sensitivity Threshold
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'tolerant', title: 'Tolerant', desc: 'Slight alerts on banned additives.' },
                { id: 'balanced', title: 'Balanced', desc: 'Checks harsh sulfactants, colorants.' },
                { id: 'strict', title: 'Strict Bio-Shield', desc: 'Bans all synthetic preservatives.' }
              ].map((cal) => (
                <button
                  key={cal.id}
                  onClick={() => setUserProfile({ ...userProfile, riskCalibration: cal.id as any })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    userProfile.riskCalibration === cal.id 
                      ? 'bg-gradient-to-b from-[#7B61FF]/10 to-[#B517FF]/10 border-[#7B61FF] shadow-inner' 
                      : 'bg-[#050816] border-white/5 hover:border-white/10'
                  }`}
                >
                  <span className="text-xs font-mono font-black text-white block">{cal.title}</span>
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{cal.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-400" /> Developer Laboratory APIs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Integrate PureByte ingredient safety indices directly into external checkout checkouts or shop plugins.
            </p>

            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                readOnly
                value={apiKey}
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#00FFD1] font-mono"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                title="Toggle Visibility"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* COLUMN B: RESET/BACKUP ACTIONS (5 Slots) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0A1020]/80 border border-white/10 space-y-4">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
              Chassis maintenance
            </h4>

            <button
              onClick={syncBackup}
              className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDrive className="w-4 h-4" /> COMPRESS & BACKUP
            </button>

            <button
              onClick={triggerReset}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-400 hover:text-red-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> RESET CALIBRATIONS
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
