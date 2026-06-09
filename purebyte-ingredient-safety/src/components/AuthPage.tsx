/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { ShieldCheck, Lock, Mail, Fingerprint, Eye, EyeOff, Bot } from 'lucide-react';

interface AuthPageProps {
  setCurrentPage: (page: PageId) => void;
  onLoginSuccess: (email: string) => void;
}

export default function AuthPage({ setCurrentPage, onLoginSuccess }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioSuccess, setBioSuccess] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoadingText('Authenticating secure keys...');
    setTimeout(() => {
      onLoginSuccess(email || 'expert.reviewer@purebyte.lab');
      setCurrentPage('onboarding');
    }, 1200);
  };

  const handleBiometricTrigger = () => {
    if (bioScanning || bioSuccess) return;
    setBioScanning(true);
    setLoadingText('Awaiting biometric fingerprint telemetry...');

    setTimeout(() => {
      setLoadingText('Matching encryption ridges (99.8% match)...');
    }, 1200);

    setTimeout(() => {
      setBioScanning(false);
      setBioSuccess(true);
      setLoadingText('Decryption Key Issued. Initializing...');
      setTimeout(() => {
        onLoginSuccess('biometrics.user@purebyte.lab');
        setCurrentPage('onboarding');
      }, 1000);
    }, 3000);
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-6">
      
      {/* Container holding biometric & standard tabs as a cool cyberpunk visor */}
      <div className="w-full max-w-md bg-gradient-to-b from-[#101828]/90 to-[#0A1020]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative backdrop-blur-xl p-8">
        
        {/* Glow spotlight decoration */}
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#7B61FF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#B517FF] p-[1px] mx-auto mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#00FFD1]" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">PureByte Lab Access</h3>
          <p className="text-xs text-slate-400 mt-1">Decrypt safe ingredient maps on any product label</p>
        </div>

        {/* Dynamic Action State Status readout */}
        {loadingText && (
          <div className="mb-6 p-3 rounded-lg bg-[#00FFD1]/5 border border-[#00E5FF]/20 text-center text-[11px] font-mono text-[#00FFD1] animate-pulse">
            ⚡ {loadingText}
          </div>
        )}

        {/* Dual Mode Login View */}
        <div className="space-y-6">

          {/* Core Biometric Deck (Marvelous holographic sensory scanner) */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col items-center">
            <h4 className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest mb-3">Biometric Core Decryption</h4>
            
            <button
              onClick={handleBiometricTrigger}
              disabled={bioScanning || bioSuccess}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                bioSuccess 
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400 shadow-[0_0_20px_rgba(0,230,118,0.3)]' 
                  : bioScanning 
                    ? 'bg-[#00FFD1]/20 border-[#00FFD1]/40 text-[#00FFD1] shadow-[0_0_30px_rgba(0,255,209,0.3)] animate-pulse'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-[#00FFD1]'
              } border cursor-pointer`}
            >
              <Fingerprint className={`w-12 h-12 transition-transform duration-500 ${bioScanning ? 'scale-110' : ''}`} />

              {/* Laser beam sweep overlay line */}
              {bioScanning && (
                <div className="absolute inset-x-0 h-0.5 bg-[#00FFD1] shadow-[0_0_8px_#00FFD1] animate-bounce top-1/4" />
              )}
            </button>

            <span className="text-[10px] text-slate-400 mt-3 font-mono leading-relaxed">
              {bioSuccess 
                ? 'DECRYPTION COMPLETE' 
                : bioScanning 
                  ? 'PRESS & HOLD CAPTURING RIGID RIDGES' 
                  : 'TOUCH FINGERPRINT DIODE TO QUICK AUTH'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">OR CRYPTO CREDENTIALS</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          {/* Standard Input Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Lab Registry Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="your.email@purebyte.lab"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-[#7B61FF] focus:outline-none focus:ring-1 focus:ring-[#7B61FF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Lab Decryption Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-[#7B61FF] focus:outline-none focus:ring-1 focus:ring-[#7B61FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono">
              <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded accent-[#00FFD1] bg-white/5 border-white/10" />
                <span>Keep Decrypted</span>
              </label>
              <span className="text-[#00FFD1] hover:underline cursor-pointer">Forgot Hex Key?</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] hover:from-[#00FFD1] hover:to-[#B517FF] text-xs font-bold text-black font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(123,97,255,0.2)] cursor-pointer"
            >
              Sign In Lab Agent
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
