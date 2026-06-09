/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Product } from '../types';
import { Camera, Upload, AlertCircle, RefreshCcw, Sparkles, Shield, Compass, FileImage } from 'lucide-react';

interface ScanPageProps {
  setCurrentPage: (page: PageId) => void;
  products: Product[];
  setProducts: (items: Product[]) => void;
  onOCRReviewNeeded: (rawText: string, productContext: Product) => void;
}

export default function ScanPage({ setCurrentPage, products, setProducts, onOCRReviewNeeded }: ScanPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'capturing' | 'analyzing'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [laserY, setLaserY] = useState(10);
  const [direction, setDirection] = useState(1);
  const [scanCountdown, setScanCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');

  // Animate scanning laser bar inside the holographic HUD
  useEffect(() => {
    if (scanStatus === 'capturing' || scanStatus === 'analyzing') {
      const interval = setInterval(() => {
        setLaserY((prevY) => {
          let nextY = prevY + direction * 2.5;
          if (nextY >= 90) {
            setDirection(-1);
            return 90;
          }
          if (nextY <= 5) {
            setDirection(1);
            return 5;
          }
          return nextY;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scanStatus, direction]);

  // Countdown timer for automatic capture
  useEffect(() => {
    let timer: any;
    if (scanStatus === 'capturing' && scanCountdown > 0) {
      timer = setTimeout(() => {
        setScanCountdown(scanCountdown - 1);
      }, 1000);
    } else if (scanStatus === 'capturing' && scanCountdown === 0) {
      // Trigger instant processing transition
      setScanStatus('analyzing');
      setScanCountdown(3);
      
      // Simulate label parsing loading
      setTimeout(() => {
        if (selectedProduct) {
          // Trigger the next stage: OCR REVIEW screen!
          // Mark the product as scanned in state
          const updated = products.map(p => p.id === selectedProduct.id ? { ...p, scanned: true } : p);
          setProducts(updated);
          onOCRReviewNeeded(selectedProduct.ingredientsText, selectedProduct);
        } else {
          setErrorMessage('Target text matrix unreadable. Retuning optical lens.');
          setScanStatus('idle');
        }
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [scanStatus, scanCountdown, selectedProduct, products, onOCRReviewNeeded, setProducts]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setScanStatus('capturing');
    setScanCountdown(3);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanStatus('analyzing');
    setUploadProgress(10);
    
    // Simulate image ingestion timeline
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          // Pick a random product to simulate parsing outcome
          const randomIdx = Math.floor(Math.random() * products.length);
          const matched = products[randomIdx];
          setSelectedProduct(matched);
          
          setTimeout(() => {
            onOCRReviewNeeded(matched.ingredientsText, matched);
          }, 1000);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  return (
    <div className="w-full text-white pb-16 px-6 max-w-5xl mx-auto space-y-8 text-left pt-6">
      
      <div>
        <span className="text-[#00FFD1] font-mono text-xs uppercase tracking-widest">HOLOGRAPHIC PARSING SYSTEM</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-1">BIOMETRIC OPTICAL SCANNING VORTEX</h2>
        <p className="text-xs text-slate-400 mt-2">
          Position any product ingredient deck in the active HUD brackets, select from preset targets, or drag and drop raw labels directly.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="ml-auto text-slate-400 font-bold">dismiss</button>
        </div>
      )}

      {/* THREE INTERACTIVE MODALITY COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN A: VIEWPORT SIMULATOR (7 Slots) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-white/10 bg-[#050816]/70 relative overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-between">
            
            {/* Holographic camera brackets marker layer */}
            <div className="absolute inset-0 border border-white/[0.03] rounded-3xl pointer-events-none" />

            {/* Simulated Live Viewport Feed */}
            {scanStatus === 'idle' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] p-[1.5px] animate-pulse">
                  <div className="w-full h-full bg-[#050816] rounded-full flex items-center justify-center text-[#00FFD1]">
                    <Camera className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Active Targeting System Offline</h4>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Select a preset chemical target block on the right, or drop raw packaging photos to initialize analysis.
                  </p>
                </div>

                {/* Upload drag drop trigger panel */}
                <div className="pt-4 w-full max-w-xs">
                  <label className="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00FFD1] transition-all cursor-pointer">
                    <Upload className="w-5 h-5 text-slate-500 mb-2" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Upload Raw Image Label</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadSimulate}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex-1 relative flex flex-col justify-between p-6 overflow-hidden min-h-[350px]">
                
                {/* Simulated Lens Blur & Targeted Bounding Box */}
                <div className="absolute inset-0 bg-[#0A1020]/40 overflow-hidden">
                  
                  {/* Laser Sweeper Line */}
                  <div 
                    className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent shadow-[0_0_15px_#00FFD1] z-10 transition-all duration-75"
                    style={{ top: `${laserY}%` }}
                  />

                  {/* Dynamic Bounding Box Overlay mimicking Iron Man Target brackets */}
                  <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[20%] border-2 border-dashed border-[#00FFF1]/40 rounded-xl flex items-center justify-center bg-[#050816]/30 backdrop-blur-[1px] animate-pulse">
                    
                    {/* Targeting ticks */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#00FFD1]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#00FFD1]" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#00FFD1]" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#00FFD1]" />

                    {/* OCR localized mock text fields */}
                    <div className="text-center font-mono opacity-80 space-y-1 text-[11px] select-none">
                      <span className="inline-block bg-[#00FFD1]/20 border border-[#00FFD1]/40 text-[#00FFD1] text-[9px] px-2 py-0.5 rounded tracking-widest mb-2 font-bold animate-pulse">LABEL FOCUS LOCKED</span>
                      <div className="text-[#00FFD1] font-bold">EXTRACTING SEQUENCE INGREDIENT: RED 40</div>
                      <div className="text-yellow-400">DETECTED: ASPARTAME (CONFIDENCE 99.1%)</div>
                    </div>

                  </div>
                </div>

                {/* Top Telemetry Overlay values */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-slate-400">
                  <span>IRIS ZOOM: 2.4X</span>
                  <span>SPECTROGRID SENSORS: CALIBRATED</span>
                </div>

                {/* Big Center Countdown Alert */}
                {scanStatus === 'capturing' && (
                  <div className="relative z-10 mx-auto text-center self-center bg-black/60 px-6 py-4 rounded-3xl border border-white/10 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#00FFD1] uppercase tracking-widest leading-none">AUTO CAPTURING IN</span>
                    <span className="text-4xl font-mono font-black text-white mt-2 leading-none animate-ping">{scanCountdown}</span>
                  </div>
                )}

                {/* Upload percentage loading state bar */}
                {scanStatus === 'analyzing' && (
                  <div className="relative z-10 mx-auto text-center self-center w-2/3 bg-black/8 w-full p-4 rounded-3xl border border-white/10 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest leading-none">PARSING label ATOMIC sequences</span>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                {/* Bottom SoundWave telemetry lines */}
                <div className="relative z-10 flex items-center gap-3 self-end w-full border-t border-white/5 pt-3 mt-auto justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span 
                        key={i} 
                        className="w-1 bg-[#00FFD1] rounded" 
                        style={{ 
                          height: `${Math.random() * 15 + 4}px`,
                          animation: 'soundwave 1s infinite alternate',
                          animationDelay: `${i * 0.1}s`
                        }} 
                      />
                    ))}
                  </div>

                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                    DECIBEL LEVEL ACTIVE WAVEFRONT
                  </span>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* COLUMN B: PRESET TARGET PACKS (4 Slots) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest">Preset Targets</h4>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Select one of these pre-mapped compound profiles to feed directly into the scanner as a test case:
          </p>

          <div className="space-y-3">
            {products.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                disabled={scanStatus !== 'idle'}
                className="w-full text-left p-3.5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 flex items-center justify-between text-xs transition-all group disabled:opacity-30 disabled:pointer-events-none"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 leading-none block mb-1">
                    {prod.brand} • {prod.type}
                  </span>
                  <span className="font-bold text-white group-hover:text-[#00FFD1] transition-all">
                    {prod.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded uppercase font-bold leading-none">
                  SELECt
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes soundwave {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          100% { transform: scaleY(1.3); opacity: 1; }
        }
      `}</style>

    </div>
  );
}
