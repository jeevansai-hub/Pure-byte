/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product } from '../types';
import { Search, Compass, ShieldCheck, Database, LayoutGrid } from 'lucide-react';

interface ProductLibraryProps {
  setCurrentPage: (page: PageId) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductLibrary({ setCurrentPage, products, onSelectProduct }: ProductLibraryProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'cosmetic' | 'beverage' | 'pharmaceutical'>('all');

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.type === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full text-white pb-16 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6">
      
      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">Global Chemical Listings</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">PRODUCT CATALOG & RATINGS</h2>
        <p className="text-xs text-slate-400 mt-2">
          Compare consumer indices and inspect safe structural ratings for thousands of verified products from global chemical listings.
        </p>
      </div>

      {/* SEARCH AND GRID SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search thousands of verified food and beauty brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#0A1020]/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-[#7B61FF]"
          />
        </div>

        <div className="md:col-span-6 flex gap-2 flex-wrap">
          {['all', 'food', 'cosmetic', 'beverage', 'pharmaceutical'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase border transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white' 
                  : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.03]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARCHITECTURAL CARDS COMPONENT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => {
          const isClean = prod.safetyScore >= 80;
          return (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#101828]/80 to-[#0A1020]/80 border border-white/5 hover:border-white/10 shadow-lg cursor-pointer group transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden h-36 mb-4 border border-white/10">
                  <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-black ${
                    isClean ? 'bg-emerald-500/20 text-[#00E676] border border-emerald-500/40' : 'bg-red-500/20 text-[#FF5252] border border-red-500/40'
                  }`}>
                    SCORE {prod.safetyScore}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-slate-500 uppercase block">{prod.brand}</span>
                <h4 className="text-sm font-bold text-white mt-1 group-hover:text-[#00FFD1] transition-all leading-tight">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-2 font-sans line-clamp-2">
                  Chemical profile: {prod.ingredientsText}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="uppercase">{prod.type} Standard</span>
                <span className="group-hover:text-white transition-colors flex items-center">
                  DIAGNOSTICS <LayoutGrid className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
