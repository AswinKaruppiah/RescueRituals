import React, { useState } from 'react';
import RsvpConfirmModal from '../../components/Modal/RsvpConfirmModal';
import { Users, CheckCircle, Crown, Loader2 } from 'lucide-react';

export default function RsvpCard({ event, onRsvpToggle, isUpdating = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFull = event.capacity > 0 && event.attendeesCount >= event.capacity;
  const isDisabled = isUpdating || (!event.isGoing && isFull);

  const handleButtonClick = () => {
    if (event.isHost || isDisabled) return;
    if (!event.isGoing) {
      setIsOpen(true);
    } else {
      onRsvpToggle();
    }
  };

  const handleConfirmModal = () => {
    onRsvpToggle();
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 sticky top-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <span className="text-xs font-semibold text-neutral-400 uppercase">Admission</span>
          <span className="text-2xl font-black text-white">{event.price}</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-neutral-300">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-white" /> Attendance
            </span>
            <div className="flex items-center gap-2">
              {isFull && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                  Slots Full
                </span>
              )}
              <span className="font-bold text-white">
                {event.attendeesCount} / {event.capacity} Spots
              </span>
            </div>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-red-500' : 'bg-white'
              }`}
              style={{
                width: `${Math.min(100, ((event.attendeesCount || 0) / (event.capacity || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        {event.isHost ? (
          <div className="w-full py-3.5 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-2 cursor-default">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>You're the Host</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isDisabled}
            onClick={handleButtonClick}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              event.isGoing
                ? 'bg-white text-black hover:bg-neutral-200 shadow-lg cursor-pointer'
                : isFull
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-800'
                : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 cursor-pointer'
            }`}
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUpdating ? (
              'Syncing...'
            ) : event.isGoing ? (
              <>
                <CheckCircle className="w-4 h-4" />
                RSVP Confirmed (Click to Cancel)
              </>
            ) : isFull ? (
              'Slots Full'
            ) : (
              'Confirm RSVP'
            )}
          </button>
        )}
      </div>

      <RsvpConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        event={event}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
}
