/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, AuditLog, Ingredient } from '../types';
import { Database, ShieldAlert, Cpu, Lock, Terminal, CheckCircle2, ChevronRight, Edit2 } from 'lucide-react';
import { MOCK_AUDIT_LOGS, MOCK_INGREDIENTS } from '../data/mockData';

interface AdminConsoleProps {
  setCurrentPage: (page: PageId) => void;
  ingredients: Ingredient[];
  setIngredients: (items: Ingredient[]) => void;
}

export default function AdminConsole({ setCurrentPage, ingredients, setIngredients }: AdminConsoleProps) {
  const [activeTab3D, setActiveTab3D] = useState<'audit' | 'database'>('audit');
  const [selectedIng, setSelectedIng] = useState<Ingredient | null>(null);
  const [editingScore, setEditingScore] = useState(50);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdateRisk = () => {
    if (!selectedIng) return;

    // Update ingredients in standard state
    const updated = ingredients.map(ing => {
      if (ing.id === selectedIng.id) {
        return {
          ...ing,
          riskScore: editingScore,
          riskLevel: editingScore >= 80 ? 'critical' : editingScore >= 50 ? 'high' : 'safe'
        } as Ingredient;
      }
      return ing;
    });

    setIngredients(updated);
    setToastMessage(`Chemical target ${selectedIng.name} parameters altered successfully.`);
    setSelectedIng(null);

    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6 relative">
      
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] border border-[#00FFD1]/30 text-white shadow-xl animate-bounce text-xs font-mono">
          ✓ {toastMessage}
        </div>
      )}

      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">Laboratory Root Clearance</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">ADMIN LAB CONSOLE</h2>
        <p className="text-xs text-slate-400 mt-2">
          Verify operational audit ledgers, secure server transactions, edit chemical hazard metrics, and manage ingredient indexes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: NAVIGATION TABS & ACTION TABLE (8 Slots) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex bg-[#0A1020]/90 p-1 rounded-xl border border-white/5 text-xs font-mono">
            <button
              onClick={() => setActiveTab3D('audit')}
              className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer text-center ${activeTab3D === 'audit' ? 'bg-[#7B61FF]/20 border border-[#7B61FF]/30 font-bold text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.01]'}`}
            >
              SECURE TRANSACTION ALERTS
            </button>
            <button
              onClick={() => setActiveTab3D('database')}
              className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer text-center ${activeTab3D === 'database' ? 'bg-[#7B61FF]/20 border border-[#7B61FF]/30 font-bold text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.01]'}`}
            >
              CHEMICAL REGISTRY DICTIONARY
            </button>
          </div>

          {/* TAB 1: OPERATIONAL LEDGER (Cyberpunk style vertical terminal logs) */}
          {activeTab3D === 'audit' && (
            <div className="rounded-3xl border border-white/10 bg-[#050816]/70 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <span className="text-[10px] font-mono text-[#00FFD1]">PROTOCOL SYNC: LIVE</span>
                <span className="text-[10px] font-mono text-slate-500">OPERATOR CLEARANCE LVL 5</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {MOCK_AUDIT_LOGS.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3">
                    <div className="mt-0.5">
                      {log.status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : log.status === 'warn' ? (
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-[#FF5252]" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white leading-snug">{log.action}</span>
                        <span className="text-[9px] text-slate-600 block">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">OPERATOR: {log.operator} • IP: {log.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INGREDIENT REGISTRY MANAGER (Table of chemical targets with active editing fields) */}
          {activeTab3D === 'database' && (
            <div className="p-5 rounded-3xl bg-[#0A1020]/80 border border-white/10 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">CORE DICTIONARY ENTRIES ({ingredients.length})</span>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/5 pb-2 text-left text-slate-500 uppercase text-[9px]">
                      <th className="py-2.5">Compound Name</th>
                      <th className="py-2.5">Category</th>
                      <th className="py-2.5">Risk Rating</th>
                      <th className="py-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ing) => (
                      <tr key={ing.id} className="border-b border-white/5 text-slate-300">
                        <td className="py-2.5 font-sans font-bold text-white text-[11.5px]">{ing.name}</td>
                        <td className="py-2.5 uppercase text-[10px] text-purple-400">{ing.category}</td>
                        <td className="py-2.5">
                          <span className={`font-bold ${
                            ing.riskScore >= 80 ? 'text-[#FF5252]' : ing.riskScore >= 50 ? 'text-[#FFC400]' : 'text-[#00E676]'
                          }`}>
                            {ing.riskScore}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <button
                            onClick={() => {
                              setSelectedIng(ing);
                              setEditingScore(ing.riskScore);
                            }}
                            className="p-1 px-2 rounded bg-white/5 border border-white/10 hover:border-[#00FFD1] text-[10px] text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3 text-[#00FFD1]" /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* COLUMN B: QUICK INGREDIENT RISK EDITOR MODAL PANEL (4 Slots) */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 space-y-4 shadow-2xl">
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Compound Metric Editor
            </h4>

            {selectedIng ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block">Compound selected</span>
                  <span className="text-xs font-bold text-white block mt-1">{selectedIng.name}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>BIO-HAZARD RISK RANGE</span>
                    <span className="text-[#00FFD1] font-bold">{editingScore} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingScore}
                    onChange={(e) => setEditingScore(parseInt(e.target.value))}
                    className="w-full accent-[#00FFD1] h-1"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase">
                    <span>Safe (0)</span>
                    <span>High (50)</span>
                    <span>Critical (100)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleUpdateRisk}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-black font-semibold text-xs tracking-wide uppercase transition-all shadow cursor-pointer"
                  >
                    DEPLOY RISK PARAMETERS
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 italic text-center py-6">
                Navigate to the Chemical Registry tab and click EDIT on any entry to calibrate global risk indices.
              </p>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
