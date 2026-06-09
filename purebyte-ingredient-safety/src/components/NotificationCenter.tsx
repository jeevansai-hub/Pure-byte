/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NotificationItem } from '../types';
import { ShieldAlert, Info, Bell, Check, Trash2 } from 'lucide-react';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

export default function NotificationCenter({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onDeleteNotification,
}: NotificationCenterProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="w-full max-w-md h-full bg-[#050816]/95 border-l border-white/10 p-6 shadow-2xl relative flex flex-col backdrop-blur-xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00FFD1]" />
            <h2 className="text-lg font-bold text-white tracking-tight">Intelligence Feed</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono text-slate-400 uppercase">
            {notifications.filter(n => !n.read).length} Unresolved Alerts
          </span>
          {notifications.some(n => !n.read) && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-medium text-[#00FFD1] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {notifications.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-center">
              <Bell className="w-8 h-8 opacity-20 mb-2" />
              <p className="text-sm">Signal clear. No active alerts.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all relative ${
                  n.read
                    ? 'bg-white/[0.01] border-white/5 opacity-70'
                    : 'bg-white/[0.04] border-white/10 shadow-[0_0_15px_rgba(0,255,209,0.03)]'
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {n.type === 'recall' ? (
                      <ShieldAlert className="w-4 h-4 text-[#FF5252]" />
                    ) : n.type === 'health-alert' ? (
                      <ShieldAlert className="w-4 h-4 text-[#FFC400]" />
                    ) : (
                      <Info className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white leading-snug">{n.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                    <span className="text-[9px] font-mono text-slate-500 mt-2 block">{n.timestamp}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteNotification(n.id)}
                  className="absolute bottom-2 right-2 text-slate-500 hover:text-white transition-colors p-1"
                  title="Delete Alert"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 pt-4 mt-4 text-center text-[10px] font-mono text-slate-500">
          SECURE PROTOCOL • AUTOMATICALLY PULSED EVERY 15M
        </div>
      </div>
    </div>
  );
}
