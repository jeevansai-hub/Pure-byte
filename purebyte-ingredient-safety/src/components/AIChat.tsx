/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, ChatMessage } from '../types';
import { MessageSquare, Send, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface AIChatProps {
  setCurrentPage: (page: PageId) => void;
}

export default function AIChat({ setCurrentPage }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-rec-1',
      sender: 'assistant',
      text: 'Greetings. I am PureByte AI, your molecular safety co-pilot. Specify any chemical compound structure (e.g., Aspartame, Phenoxyethanol) or ask for general food preservation advice.',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const promptChips = [
    'Is Aspartame safe?',
    'Find safer alternatives for SLES',
    'Why is Titanium Dioxide hazardous?',
    'Are parabens banned in the EU?'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || typing) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate smart clinical responses corresponding to choices
    setTimeout(() => {
      let reply = '';
      let citationsList: { title: string }[] = [];

      const query = textToSend.toLowerCase();
      if (query.includes('aspartame')) {
        reply = 'Aspartame (E951) is classified by the WHO IARC as "possibly carcinogenic to humans" (Group 2B). High temperatures cause breakdown into phenylalanine and aspartic acid, which act as central nervous excitotoxins under prolonged clinical exposure.';
        citationsList = [{ title: 'WHO IARC July 2023 Evaluation Ledger' }, { title: 'Dopamine & Phenylalanine transfers on Blood-Brain Barriers' }];
      } else if (query.includes('sles') || query.includes('alternative') || query.includes('sulfate')) {
        reply = 'Sodium Laureth Sulfate (SLES) acts as a powerful lathering surfactant but strips skin lipids, inducing dermatitis. Cleaner organic replacements include "Coco-Glucoside" and "Sodium Cocoyl Isethionate", which preserve natural protective dermis layers.';
        citationsList = [{ title: 'Cosmetic Ingredient Review (CIR) Safety Guidebook' }];
      } else if (query.includes('titanium') || query.includes('dioxide')) {
        reply = 'Titanium Dioxide (E171) is banned as a food additive across the European Union. Nanoparticles accumulate inside spleen, kidney, and intestinal linings, degrading DNA integrity (genotoxic risk).';
        citationsList = [{ title: 'European Food Safety Authority (EFSA) 2021 Clinical Opinion' }];
      } else if (query.includes('paraben')) {
        reply = 'Yes, the EU enforces strict bans on long-chain parabens (Isopropylparaben, Isobutylparaben) in cosmetics due to weak estrogen-mimicking activity linked directly to endocrine tumors.';
        citationsList = [{ title: 'Scientific Committee on Consumer Safety (SCCS) Directive' }];
      } else {
        reply = 'I have matched the specified chemical against the active PureByte database. No critical alerts triggered, but I advise utilizing organic tocopherols as standard FAT preservation agents over BHA.';
        citationsList = [{ title: 'PureByte Chemical Compliance Registry Index' }];
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        citations: citationsList
      };

      setMessages(prev => [...prev, assistantMsg]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-4xl mx-auto space-y-8 text-left pt-6">
      
      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">Molecular AI Chat Shell</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">CHEMICAL CONVERSATION COMPANION</h2>
        <p className="text-xs text-slate-400 mt-2">
          Interface directly with our advanced toxicology database. Stream answers, clinical citations, and organic replacement lists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: CHAT AREA (8 Slots) */}
        <div className="lg:col-span-8 bg-[#0A1020]/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[520px]">
          
          {/* Header */}
          <div className="p-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between font-mono text-[10px]">
            <span className="text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-ping" />
              PUREBYTE CORE v1.2
            </span>
            <span className="text-slate-500">SECURE SHELL CONTEXT</span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => {
              const isAssistant = m.sender === 'assistant';
              return (
                <div 
                  key={m.id} 
                  className={`flex gap-3 max-w-[85%] ${isAssistant ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
                >
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isAssistant 
                      ? 'bg-white/[0.02] border border-white/5 text-slate-200' 
                      : 'bg-[#7B61FF]/15 border border-[#7B61FF]/30 text-white'
                  }`}>
                    {m.text}

                    {/* Citations block */}
                    {m.citations && m.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Clinical citations:</span>
                        {m.citations.map((c, idx) => (
                          <div key={idx} className="text-[10px] font-mono text-[#00FFD1] flex items-center gap-1">
                            • {c.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex gap-2 items-center text-xs font-mono text-[#00FFD1] italic animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                PureByte co-pilot matches sequences in database...
              </div>
            )}
          </div>

          {/* Prompt Chips Bar */}
          <div className="p-3 bg-black/40 border-t border-white/5 flex gap-2 overflow-x-auto select-none">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-[10px] text-slate-400 hover:text-white transition-all cursor-pointer whitespace-nowrap font-mono"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form typing row */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask PureByte: 'Is Aspartame safe in soda?'..."
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7B61FF]"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-black hover:opacity-90 hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* COLUMN B: AI CAPABILITIES (4 Slots) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <h4 className="text-xs font-mono text-[#00FFD1] uppercase tracking-widest border-b border-white/5 pb-2">
              Capabilities list
            </h4>

            <div className="space-y-3 text-xs text-slate-400 leading-relaxed font-sans">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#00FFD1] mt-0.5" />
                <span>Isolate harmful synthetics and find organic, biochemically clean equivalents.</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5" />
                <span>Verify if an additive conforms to US FDA vs. strict European chemical indices.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
