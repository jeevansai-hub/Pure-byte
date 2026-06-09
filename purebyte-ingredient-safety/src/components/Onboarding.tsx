/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, UserProfile } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, ShieldAlert, Heart, Calendar, Eye } from 'lucide-react';

interface OnboardingProps {
  setCurrentPage: (page: PageId) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

export default function Onboarding({ setCurrentPage, userProfile, setUserProfile }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const maxSteps = 4;

  const toggleAllergy = (allergy: string) => {
    const list = userProfile.allergies.includes(allergy)
      ? userProfile.allergies.filter((a) => a !== allergy)
      : [...userProfile.allergies, allergy];
    setUserProfile({ ...userProfile, allergies: list });
  };

  const toggleCondition = (condition: string) => {
    const list = userProfile.healthConditions.includes(condition)
      ? userProfile.healthConditions.filter((c) => c !== condition)
      : [...userProfile.healthConditions, condition];
    setUserProfile({ ...userProfile, healthConditions: list });
  };

  const toggleDiet = (diet: string) => {
    const list = userProfile.dietPreferences.includes(diet)
      ? userProfile.dietPreferences.filter((d) => d !== diet)
      : [...userProfile.dietPreferences, diet];
    setUserProfile({ ...userProfile, dietPreferences: list });
  };

  const toggleGoal = (goal: string) => {
    const list = userProfile.lifestyleGoals.includes(goal)
      ? userProfile.lifestyleGoals.filter((g) => g !== goal)
      : [...userProfile.lifestyleGoals, goal];
    setUserProfile({ ...userProfile, lifestyleGoals: list });
  };

  const allergyOptions = ['Gluten', 'Lactose / Dairy', 'Tree Nuts / Peanuts', 'Soy Products', 'Egg Albumin', 'Sulphites', 'Salicylates', 'Shellfish'];
  const conditionOptions = ['ADHD / Hyperactivity', 'Gut Microbiome Dysbiosis', 'High Blood Pressure', 'Skin Eczema / Psoriasis', 'Acidity & Reflux', 'Cardiovascular Markers', 'Endocrine Susceptibility'];
  const dietOptions = ['100% Organic Targeted', 'Vegan / Plant-Based', 'Keto / Low-Carb', 'Paleolithic Clean Food', 'Halal', 'Kosher'];
  const goalOptions = ['Filter Synthetic Food Dyes', 'Evade Cosmetic Carcinogens', 'Zero Artificial Sweeteners', 'Eliminate Sulfate Foaming Agents', 'Evade Microplastics & Silica', 'Preservative Detoxification'];

  const triggerCompletion = () => {
    // Navigate straight to dynamic command dashboard HQ
    setCurrentPage('dashboard');
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <div className="bg-gradient-to-b from-[#101828]/95 to-[#0A1020]/95 border border-white/10 rounded-3xl p-8 shadow-2xl relative backdrop-blur-xl">
        
        {/* Step progress timeline */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-white tracking-tight">Profile Personalization</span>
            <span className="text-xs text-[#00FFD1] font-mono ml-2">(SENSORY SYNC)</span>
          </div>
          <span className="font-mono text-xs text-slate-500">
            Node {step} of {maxSteps}
          </span>
        </div>

        {/* Custom graphic progress rail */}
        <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#B517FF] transition-all duration-300"
            style={{ width: `${(step / maxSteps) * 100}%` }}
          />
        </div>

        {/* STEP 1: GENDER, AGE, PREGNANCY */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-bold text-white">Biometrical Index Calibration</h3>
              <p className="text-xs text-slate-400 mt-1">These parameters calibrate our chemical risk limits to fit your metabolic biology.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Biological Age</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00FFD1]" />
                  <input
                    type="number"
                    min="1"
                    max="115"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({ ...userProfile, age: parseInt(e.target.value) || 28 })}
                    className="w-full p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:border-[#7B61FF]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Sex Designation</label>
                <div className="grid grid-cols-3 gap-2">
                  {['male', 'female', 'other'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setUserProfile({ ...userProfile, gender: gender as any })}
                      className={`py-2 rounded-xl border text-[10px] font-mono uppercase transition-all ${
                        userProfile.gender === gender 
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white' 
                          : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pregnancy toggle switch (Specifically required for pregnancy status) */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between mt-4">
              <div className="text-left">
                <span className="text-xs font-bold text-white block">Active Pregnancy / Nursing Status</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Locks absolute critical bans on endocrine-active preservatives like Parabens and BHA.</p>
              </div>
              <button
                onClick={() => setUserProfile({ ...userProfile, pregnancyStatus: !userProfile.pregnancyStatus })}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                  userProfile.pregnancyStatus ? 'bg-[#00FFD1]' : 'bg-white/10'
                }`}
              >
                <div className={`bg-[#050816] w-4 h-4 rounded-full shadow-md transform duration-300 ${userProfile.pregnancyStatus ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ALLERGIES & HEALTH DISORDERS */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-bold text-white">Allergen & Health Markers</h3>
              <p className="text-xs text-slate-400 mt-1">Select any chemical or food protein allergens. PureByte highlights critical warning flags instantly.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Protein & Extract Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((allergy) => {
                    const active = userProfile.allergies.includes(allergy);
                    return (
                      <button
                        key={allergy}
                        onClick={() => toggleAllergy(allergy)}
                        className={`px-3 py-2 rounded-xl text-xs border transition-all ${
                          active 
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                        }`}
                      >
                        {allergy}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Health Diagnostics & Deficits</label>
                <div className="flex flex-wrap gap-2">
                  {conditionOptions.map((cond) => {
                    const active = userProfile.healthConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-2 rounded-xl text-xs border transition-all ${
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
            </div>
          </div>
        )}

        {/* STEP 3: DIETS & CRITICAL GOALS */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-bold text-white">Dietary Standardizations</h3>
              <p className="text-xs text-slate-400 mt-1">Specify your clinical dietary profile to flag chemical elements out of compliance boundaries.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Predefined Food Standards</label>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map((diet) => {
                    const active = userProfile.dietPreferences.includes(diet);
                    return (
                      <button
                        key={diet}
                        onClick={() => toggleDiet(diet)}
                        className={`px-3 py-2 rounded-xl text-xs border transition-all ${
                          active 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                        }`}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Micro-Tox Avoidance Goals</label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((goal) => {
                    const active = userProfile.lifestyleGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`px-3 py-2 rounded-xl text-xs border transition-all ${
                          active 
                            ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-cyan-300' 
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.04]'
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CALIBRATION PREVIEW */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h3 className="text-lg font-bold text-white">Risk Sensitivity Calibration</h3>
              <p className="text-xs text-slate-400 mt-1">Configure your personal scanning filter tightness. Set strict margins on low warning scores or balanced rules.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'tolerant', title: 'TOLERANT', desc: 'Flags chemicals with proven clinical bans or heavy critical risks.' },
                { id: 'balanced', title: 'BALANCED', desc: 'Flags synthetic colors, harsh sulfates, and medium hazard rates.' },
                { id: 'strict', title: 'STRICT BIO-SHIELD', desc: 'Filters all synthetic additives, raw text risks, and trace preservatives.' }
              ].map((cal) => (
                <button
                  key={cal.id}
                  onClick={() => setUserProfile({ ...userProfile, riskCalibration: cal.id as any })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    userProfile.riskCalibration === cal.id 
                      ? 'bg-gradient-to-b from-[#7B61FF]/10 to-[#B517FF]/10 border-[#7B61FF] shadow-lg' 
                      : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-xs font-mono font-black text-white block">{cal.title}</span>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{cal.desc}</p>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#00E5FF]/5 via-purple-500/5 to-transparent border border-white/10 mt-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#00FFD1] mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">AI Personalized Matrix Optimized!</span>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  PureByte tuned its neural OCR filters to match <span className="text-white font-semibold">{userProfile.allergies.length} Allergens</span>, <span className="text-white font-semibold">{userProfile.lifestyleGoals.length} Toxic Avoidance Paths</span>, and a <span className="text-[#00FFD1] font-mono">{userProfile.riskCalibration.toUpperCase()}</span> sensitivity threshold. You correspond to clinical tier.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Control Buttons */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-xs text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" /> REVERT
          </button>

          {step < maxSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-xs font-bold text-black font-mono tracking-wider uppercase transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
            >
              ADVANCE <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={triggerCompletion}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#00FFD1] text-xs font-bold text-black font-mono tracking-wider uppercase transition-all hover:shadow-[0_0_20px_#00FFD1] cursor-pointer animate-bounce"
            >
              LAUNCH SYSTEM HQ <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
