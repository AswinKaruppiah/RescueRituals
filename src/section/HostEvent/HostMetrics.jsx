import React from 'react';
import { Layers, CheckCircle2, Archive } from 'lucide-react';

export default function HostMetrics({ total = 0, openCount = 0, closedCount = 0 }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Total Events */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-xs">
          <span>Total Added</span>
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div className="mt-3">
          <p className="text-2xl font-black text-white">{total}</p>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider">All Listings</span>
        </div>
      </div>

      {/* Currently Open Events */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-xs">
          <span>Current Open</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-3">
          <p className="text-2xl font-black text-white">{openCount}</p>
          <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Closed Events */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-xs">
          <span>Closed</span>
          <Archive className="w-4 h-4 text-neutral-400" />
        </div>
        <div className="mt-3">
          <p className="text-2xl font-black text-neutral-300">{closedCount}</p>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Past / Full</span>
        </div>
      </div>
    </div>
  );
}
