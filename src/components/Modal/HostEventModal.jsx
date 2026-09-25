import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import {
  Calendar,
  Clock,
  MapPin,
  Type,
  AlignLeft,
  Sparkles,
  PlusCircle,
  Tag,
  Image as ImageIcon,
  Users,
  IndianRupee,
  X,
} from 'lucide-react';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80';

const CATEGORY_OPTIONS = [
  'Animal Rescue',
  'Wellness',
  'Workshops',
  'Eco & Nature',
  'Music & Arts',
  'Community',
];

export default function HostEventModal({
  isOpen,
  onClose,
  isEditing = false,
  editingEvent = null,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '2026-10-20',
    time: '10:00 AM - 02:00 PM',
    location: '',
    category: 'Animal Rescue',
    image: DEFAULT_IMAGE,
    capacity: 50,
    price: 'Free',
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        date: editingEvent.date || '2026-10-20',
        time: editingEvent.time || '',
        location: editingEvent.location || '',
        category: editingEvent.category || 'Animal Rescue',
        image: editingEvent.image || DEFAULT_IMAGE,
        capacity: editingEvent.capacity || 50,
        price: editingEvent.price || 'Free',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '2026-10-20',
        time: '10:00 AM - 02:00 PM',
        location: '',
        category: 'Animal Rescue',
        image: DEFAULT_IMAGE,
        capacity: 50,
        price: 'Free',
      });
    }
  }, [editingEvent, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) return;

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      align="right"
    >
      {/* Pinned Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-neutral-800 flex-shrink-0 bg-neutral-900">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-neutral-800 rounded-xl text-white">
            {isEditing ? <Sparkles className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              {isEditing ? 'Modify Listing' : 'Host Ritual'}
            </span>
            <h3 className="text-xl font-bold text-white">
              {isEditing ? 'Edit Event Details' : 'Create New Event'}
            </h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <div className="p-6 py-4 overflow-y-auto flex-1">
        <form id="host-event-modal-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-neutral-300" /> Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Community Rescue Walk & Shelter Care"
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
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the agenda, who should attend, and what to bring..."
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
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
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
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                placeholder="e.g. 10:00 AM - 02:00 PM"
                className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-300" /> Location / Venue
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Cubbon Park Pavilion Gardens, Bengaluru"
              className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Category, Price & Capacity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-neutral-300" /> Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-white transition [color-scheme:dark]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-neutral-300" /> Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g. Free or ₹250"
                className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neutral-300" /> Capacity
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Full-Width Cover Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-neutral-300" /> Cover Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition"
            />
          </div>
        </form>
      </div>

      {/* Pinned Footer Actions */}
      <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-neutral-800 flex-shrink-0 bg-neutral-900">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs font-semibold cursor-pointer transition active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="host-event-modal-form"
          className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer shadow-md transition active:scale-95"
        >
          {isEditing ? 'Save Changes' : 'Publish Event'}
        </button>
      </div>
    </BaseModal>
  );
}
