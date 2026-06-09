/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

export default function BackgroundLayer() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate organic cosmic floating particles
    const items = Array.from({ length: 40 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030611] select-none">
      {/* Volumetric ambient glow rings */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#00E5FF]/8 blur-[140px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#7B61FF]/10 blur-[160px] animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      <div 
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-[#B517FF]/6 blur-[120px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />

      {/* Holographic matrix grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Futuristic concentric grid lines (Iron Man HUD vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] opacity-[0.015] pointer-events-none">
        <div className="absolute inset-x-0 top-1/2 h-px bg-white" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full border border-dashed border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full border border-white" />
      </div>

      {/* Floating physical molecules particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#00FFD1]/30 blur-[0.5px] transition-all"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${p.duration}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* CSS custom animations inject */}
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80px) translateX(40px) rotate(360deg);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
