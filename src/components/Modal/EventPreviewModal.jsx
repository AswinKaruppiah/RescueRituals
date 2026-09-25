import React from 'react';
import BaseModal from './BaseModal';
import { X } from 'lucide-react';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80';

export default function EventPreviewModal({
  isOpen,
  onClose,
  formData,
  isEditing = false,
  onPublish,
}) {
  if (!formData) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <h3 className="text-lg font-bold text-white">
          Event Card Preview
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-4">
        <img
          src={formData.image || DEFAULT_IMAGE}
          alt={formData.title || 'Event preview'}
          className="w-full h-44 object-cover rounded-xl border border-neutral-800"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-white text-black text-xs font-bold rounded-full">
              {formData.category || 'General'}
            </span>
            <span className="px-2.5 py-0.5 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-full">
              {formData.price || 'Free'}
            </span>
          </div>
          <h4 className="text-lg font-bold text-white">
            {formData.title || 'Untitled Event'}
          </h4>
          <p className="text-neutral-400 text-xs line-clamp-3">
            {formData.description || 'No description provided.'}
          </p>
          <div className="text-xs text-neutral-400 space-y-1 pt-2 border-t border-neutral-800">
            <p>📅 {formData.date} • {formData.time}</p>
            <p>📍 {formData.location || 'Location not specified'}</p>
            <p>👥 Capacity: {formData.capacity || 50} attendees</p>
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
          Close Preview
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            if (onPublish) onPublish();
          }}
          className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer shadow-md transition active:scale-95"
        >
          {isEditing ? 'Save Changes' : 'Publish Now'}
        </button>
      </div>
    </BaseModal>
  );
}
