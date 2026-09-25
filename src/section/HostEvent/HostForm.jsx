import React from 'react';
import { Calendar, Clock, MapPin, Type, AlignLeft, Sparkles, PlusCircle } from 'lucide-react';

export default function HostForm({ isEditing = false, editingEvent = null, onCancel }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            {isEditing ? 'Update Event' : 'Add Event'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
        </div>
        <div className="p-2.5 bg-neutral-800/80 rounded-xl text-neutral-300">
          {isEditing ? <Sparkles className="w-5 h-5 text-white" /> : <PlusCircle className="w-5 h-5 text-white" />}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-neutral-300" /> Title
          </label>
          <input
            type="text"
            defaultValue={editingEvent?.title || ''}
            placeholder="e.g. Community Rescue Walk"
            className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-neutral-300" /> Description
          </label>
          <textarea
            rows={3}
            defaultValue={editingEvent?.description || ''}
            placeholder="Describe the event, goals, and details..."
            className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition resize-none"
          />
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-300" /> Date
            </label>
            <input
              type="date"
              defaultValue={editingEvent?.date || '2026-10-20'}
              className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-white transition [color-scheme:dark]"
            />
          </div>

          {/* Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-300" /> Time
            </label>
            <input
              type="text"
              defaultValue={editingEvent?.time || ''}
              placeholder="e.g. 10:00 AM - 02:00 PM"
              className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-300" /> Location
          </label>
          <input
            type="text"
            defaultValue={editingEvent?.location || ''}
            placeholder="e.g. Cubbon Park Pavilion Gardens, Bengaluru"
            className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
          <button
            type="button"
            className="flex-1 py-3 px-5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm transition active:scale-95 shadow-md cursor-pointer text-center"
          >
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="py-3 px-5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm transition active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
