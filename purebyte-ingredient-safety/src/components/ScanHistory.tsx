/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product } from '../types';
import { Search, Clock, Sliders, ChevronRight, Activity, Grid } from 'lucide-react';

interface ScanHistoryProps {
  setCurrentPage: (page: PageId) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ScanHistory({ setCurrentPage, products, onSelectProduct }: ScanHistoryProps) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'food' | 'cosmetic' | 'beverage'>('all');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [compareProductA, setCompareProductA] = useState<Product | null>(null);
  const [compareProductB, setCompareProductB] = useState<Product | null>(null);

  const scannedProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSelectCompare = (p: Product) => {
    if (!compareProductA) {
      setCompareProductA(p);
    } else if (!compareProductB && compareProductA.id !== p.id) {
      setCompareProductB(p);
    } else {
      setCompareProductA(p);
      setCompareProductB(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#00E676]';
    if (score >= 50) return 'text-[#FFC400]';
    return 'text-[#FF5252]';
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6">
      
      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">Chronological Databanks</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">SCANNING INGEST TIMELINE</h2>
        <p className="text-xs text-slate-400 mt-2">
          Retrace all previously ingested labels, favorites, safety score histories, and compare toxic profiles in real-time.
        </p>
      </div>

      {/* FILTER SEARCH DECK BAR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search manufacturers, brands, or specific chemical lists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#0A1020]/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-[#7B61FF]"
          />
        </div>

        <div className="md:col-span-6 flex gap-2 flex-wrap">
          {['all', 'food', 'cosmetic', 'beverage'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-3 py-2 rounded-xl text-xs font-mono uppercase border transition-all cursor-pointer ${
                filterType === type 
                  ? 'bg-[#7B61FF]/25 border-[#7B61FF] text-white' 
                  : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.03]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* CHRONO TIMELINE LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: TIMELINE CONTAINER */}
        <div className="lg:col-span-8 space-y-4">
          {scannedProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 text-slate-500">
              <Clock className="w-8 h-8 opacity-20 mx-auto mb-2" />
              <p>No recorded label timelines match these constraints.</p>
            </div>
          ) : (
            scannedProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-[#0A1020]/40 hover:bg-[#101828]/60 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div onClick={() => onSelectProduct(p)} className="flex-1 flex items-center gap-4">
                  <img 
                    src={p.imageUrl || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&auto=format&fit=crop&q=80'} 
                    alt={p.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#00FFD1] transition-all">{p.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {p.brand} • {new Date(p.scanDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSelectCompare(p)}
                    className={`px-2.5 py-1.5 rounded-lg border text-[9px] font-mono transition-all ${
                      compareProductA?.id === p.id || compareProductB?.id === p.id
                        ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 border-[#00E5FF] text-[#00FFD1] font-bold'
                        : 'bg-white/[0.01] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    COMPARE
                  </button>

                  <div 
                    onClick={() => onSelectProduct(p)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs ${
                      p.safetyScore >= 80 ? 'text-[#00E676] bg-[#00E676]/10' : p.safetyScore >= 50 ? 'text-[#FFC400] bg-[#FFC400]/10' : 'text-[#FF5252] bg-[#FF5252]/10'
                    }`}
                  >
                    {p.safetyScore}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* COLUMN B: COmPARISON DISPLAY SCREEN MODULES */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 space-y-4">
            <h4 className="text-xs font-mono text-[#00FFD1] uppercase tracking-widest border-b border-white/5 pb-2">
              Compare Sequence Deck
            </h4>

            {!compareProductA && (
              <p className="text-[10px] text-slate-500 italic text-center py-6">
                Click COMPARE on any two product cards on the left to verify active differences.
              </p>
            )}

            {compareProductA && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">PRODUCT ALPHA</span>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{compareProductA.name}</span>
                    <span className={getScoreColor(compareProductA.safetyScore)}>{compareProductA.safetyScore}</span>
                  </div>
                </div>

                {compareProductB ? (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">PRODUCT BETA</span>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{compareProductB.name}</span>
                      <span className={getScoreColor(compareProductB.safetyScore)}>{compareProductB.safetyScore}</span>
                    </div>

                    <div className="pt-3 border-t border-white/5 text-[11px] space-y-1 mt-3">
                      <div className="text-slate-400">
                        Winner Assessment:{' '}
                        <strong className="text-white">
                          {compareProductA.safetyScore > compareProductB.safetyScore 
                            ? compareProductA.name 
                            : compareProductB.name}
                        </strong>{' '}
                        is cleaner by{' '}
                        <span className="text-[#00FFD1] font-mono font-bold">
                          {Math.abs(compareProductA.safetyScore - compareProductB.safetyScore)} pts
                        </span>
                        .
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic text-center">
                    Select a second candidate block to complete diagnostic mapping.
                  </p>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
