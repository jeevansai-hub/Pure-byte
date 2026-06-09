/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { Check, CreditCard, Sparkles, Star } from 'lucide-react';

interface SubscriptionProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Subscription({ setCurrentPage }: SubscriptionProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      desc: 'Essential barcode and chemical scanning.',
      features: ['5 basic container scans weekly', 'Standard OCR parser', 'US FDA compliance filters', 'Single-device local storage']
    },
    {
      name: 'Plus',
      price: billingPeriod === 'monthly' ? 9 : 79,
      desc: 'Enhanced health alerts for active families.',
      features: ['Unlimited monthly container scans', 'Allergy clinical overrides', 'EU REACH compliance checks', 'Multidevice profile synchronization']
    },
    {
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 24 : 199,
      desc: 'Professional-grade chemical and disease diagnostics.',
      features: ['Unlimited real-time scanning', 'Holographic chemical structure graphs', 'Chronic disease propagation vectors', 'Clinical referencing citations', 'Companion AI conversation shell'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      desc: 'Dedicated compliance tunnels for laboratory teams.',
      features: ['High-throughput batch ingestion pipeline', 'Dedicated compliance tunnels', 'AES-256 backup logs exporter', 'Developer API key locks', 'Dr. Evelyn Carter toxicology updates']
    }
  ];

  return (
    <div className="w-full text-white pb-20 px-6 max-w-7xl mx-auto space-y-8 text-left pt-6">
      
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest block">Operational Clearance Tiers</span>
        <h2 className="text-3xl font-black text-white">UPGRADE YOUR SCIENTIFIC CAPABILITIES</h2>
        <p className="text-sm text-slate-400">
          Activate chronic pathological hazard engines, global regulatory trackers, and high-contrast clinical citations matching.
        </p>

        {/* Toggle button */}
        <div className="inline-flex bg-[#0A1020] p-1 rounded-xl border border-white/5 text-xs font-mono">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${billingPeriod === 'monthly' ? 'bg-[#7B61FF] text-white font-bold' : 'text-slate-400'}`}
          >
            Monthly Period
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${billingPeriod === 'yearly' ? 'bg-[#7B61FF] text-white font-bold' : 'text-slate-400'}`}
          >
            Yearly Calibration (-20%)
          </button>
        </div>
      </div>

      {/* PLANS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl bg-gradient-to-b from-[#101828]/95 to-[#0A1020]/95 border transition-all flex flex-col justify-between relative ${
              p.popular 
                ? 'border-[#7B61FF] shadow-[0_0_25px_rgba(123,97,255,0.2)] scale-102' 
                : 'border-white/5 hover:border-white/20'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7B61FF] text-[9px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> MOST POPULAR
              </span>
            )}

            <div>
              <span className="text-xs font-mono text-[#00FFD1] uppercase tracking-wider block">{p.name} Clear</span>
              <div className="flex items-baseline gap-1 mt-3">
                <span className="text-3xl font-mono font-black">${p.price}</span>
                <span className="text-xs text-slate-500 font-mono">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{p.desc}</p>

              <ul className="space-y-2 mt-6 pt-6 border-t border-white/5">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="text-[11px] text-slate-300 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`w-full py-3 mt-8 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                p.popular 
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] hover:from-[#00FFD1] hover:to-[#B517FF] text-black' 
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10'
              }`}
            >
              Select {p.name} license
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
