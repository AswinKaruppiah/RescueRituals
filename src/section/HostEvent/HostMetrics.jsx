import React from 'react';
import { Layers, CheckCircle2, Archive } from 'lucide-react';

export default function HostMetrics({
  total = 0,
  openCount = 0,
  closedCount = 0,
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {/* Total Events */}
      <div className="p-3 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-[11px] sm:text-xs">
          <span>Total Added</span>
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="mt-2 sm:mt-3">
          <p className="text-xl sm:text-2xl font-black text-white">{total}</p>
          <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider block truncate">Listings</span>
        </div>
      </div>

      {/* Currently Open Events */}
      <div className="p-3 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-[11px] sm:text-xs">
          <span>Current Open</span>
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
        </div>
        <div className="mt-2 sm:mt-3">
          <p className="text-xl sm:text-2xl font-black text-white">{openCount}</p>
          <span className="text-[9px] sm:text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block truncate">Active</span>
        </div>
      </div>

      {/* Closed Events */}
      <div className="p-3 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-neutral-400 text-[11px] sm:text-xs">
          <span>Closed</span>
          <Archive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
        </div>
        <div className="mt-2 sm:mt-3">
          <p className="text-xl sm:text-2xl font-black text-neutral-300">{closedCount}</p>
          <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider block truncate">Past / Full</span>
        </div>
      </div>
    </div>
  );
}
