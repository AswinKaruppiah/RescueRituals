import React from 'react';
import BaseModal from './BaseModal';
import { Sparkles, Calendar, MapPin, X } from 'lucide-react';

export default function RsvpConfirmModal({
  isOpen,
  onClose,
  event,
  onConfirm,
}) {
  if (!event) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white">
            Confirm RSVP
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="py-3 space-y-3">
        <p className="text-sm text-neutral-300">
          You are reserving a spot for:
        </p>
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
          <h4 className="font-bold text-white text-sm sm:text-base">
            {event.title}
          </h4>
          <div className="flex flex-col gap-1 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" /> {event.date} • {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs font-semibold cursor-pointer transition active:scale-95"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (onConfirm) onConfirm();
            onClose();
          }}
          className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer shadow-md transition active:scale-95"
        >
          Yes, Count Me In!
        </button>
      </div>
    </BaseModal>
  );
}
