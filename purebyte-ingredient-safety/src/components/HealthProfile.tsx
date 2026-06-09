/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, UserProfile } from '../types';
import { User, ShieldAlert, Heart, Calendar, CheckSquare, Sparkles } from 'lucide-react';

interface HealthProfileProps {
  setCurrentPage: (page: PageId) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export default function HealthProfile({ setCurrentPage, userProfile, setUserProfile }: HealthProfileProps) {
  const [toastMessage, setToastMessage] = useState('');

  const allergyOptions = ['Gluten', 'Lactose & Whey', 'Tree Nuts / Peanuts', 'Soy Pro', 'Egg Albumin', 'Sulphites', 'Salicylates', 'Shellfish'];
  const conditionOptions = ['ADHD / Hyperactivity', 'Gut Microbiome Dysbiosis', 'High Blood Pressure', 'Skin Eczema / Psoriasis', 'Acidity & Reflux', 'Cardiovascular Markers', 'Endocrine Susceptibility'];

  const toggleAllergy = (allergy: string) => {
    const list = userProfile.allergies.includes(allergy)
      ? userProfile.allergies.filter(a => a !== allergy)
      : [...userProfile.allergies, allergy];
    setUserProfile({ ...userProfile, allergies: list });
  };

  const toggleCondition = (condition: string) => {
    const list = userProfile.healthConditions.includes(condition)
      ? userProfile.healthConditions.filter(c => c !== condition)
      : [...userProfile.healthConditions, condition];
    setUserProfile({ ...userProfile, healthConditions: list });
  };

  const handleSave = () => {
    setToastMessage('Bio-Shield values synchronized with local neural chips.');
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <div className="w-full text-white pb-20 px-6 max-w-4xl mx-auto space-y-8 text-left pt-6 relative">
      
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] border border-[#00FFD1]/30 text-white shadow-xl animate-bounce text-xs font-mono">
          ✓ {toastMessage}
        </div>
      )}

      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">Medical Parameters Control</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">PERSONALIZED TOX-SHIELD CAPABILITIES</h2>
        <p className="text-xs text-slate-400 mt-2">
          Fine-tune personal allergy warnings, clinical constraints, and risk tolerances to customized health conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* COLUMN A: BIOMETRICAL DETAILS (5 Slots) */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#101828] to-[#0A1020] border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-[#00FFD1]" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Demographics calibration</h3>
            <span className="text-[10px] font-mono text-slate-500 block mt-1">REGISTRY NODE: PX-420</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 uppercase">Biological age</span>
              <input
                type="number"
                value={userProfile.age}
                onChange={(e) => setUserProfile({ ...userProfile, age: parseInt(e.target.value) || 28 })}
                className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] text-slate-500 uppercase">Pregnancy Status</span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span>Active lock</span>
                <button
                  onClick={() => setUserProfile({ ...userProfile, pregnancyStatus: !userProfile.pregnancyStatus })}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${
                    userProfile.pregnancyStatus ? 'bg-[#00FFD1]' : 'bg-white/10'
                  }`}
                >
                  <div className={`bg-[#050816] w-4 h-4 rounded-full shadow-md transform duration-300 ${userProfile.pregnancyStatus ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN B: ALLERGIES AND TRACKING (7 Slots) */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Molecular Allergen Overrides
            </h4>

            <div className="flex flex-wrap gap-2">
              {allergyOptions.map((all) => {
                const active = userProfile.allergies.includes(all);
                return (
                  <button
                    key={all}
                    onClick={() => toggleAllergy(all)}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all cursor-pointer ${
                      active 
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    {all}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#7B61FF]" /> Metabolic Disorders & Conditions
            </h4>

            <div className="flex flex-wrap gap-2">
              {conditionOptions.map((cond) => {
                const active = userProfile.healthConditions.includes(cond);
                return (
                  <button
                    key={cond}
                    onClick={() => toggleCondition(cond)}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all cursor-pointer ${
                      active 
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300' 
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    {cond}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] hover:from-[#00FFD1] hover:to-[#B517FF] text-xs font-black font-mono tracking-wider text-black uppercase transition-all shadow-lg cursor-pointer"
          >
            SYNCHRONIZE BIO-SHIELD SPECIFICATIONS
          </button>
        </div>

      </div>

    </div>
  );
}
