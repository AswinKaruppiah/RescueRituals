import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BaseModal({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  className = '',
  align = 'center', // 'center' (default) | 'left' | 'right'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Configuration for left, right, and center (default) positions
  const getContainerClasses = () => {
    switch (align) {
      case 'left':
        return 'overflow-hidden flex justify-start';
      case 'right':
        return 'overflow-hidden flex justify-end';
      case 'center':
      default:
        return 'overflow-y-auto flex items-center justify-center p-4';
    }
  };

  const getDialogClasses = () => {
    switch (align) {
      case 'left':
        return `h-full min-h-screen max-h-screen border-r border-neutral-800 border-y-0 border-l-0 rounded-none sm:rounded-r-2xl sm:rounded-l-none m-0 p-0 flex flex-col justify-between overflow-hidden ${className}`;
      case 'right':
        return `h-full min-h-screen max-h-screen border-l border-neutral-800 border-y-0 border-r-0 rounded-none sm:rounded-l-2xl sm:rounded-r-none m-0 p-0 flex flex-col justify-between overflow-hidden ${className}`;
      case 'center':
      default:
        return `rounded-2xl border border-neutral-800 p-6 sm:my-8 text-left ${className}`;
    }
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] ${getContainerClasses()} animate-fade-in`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full ${maxWidth} bg-neutral-900 shadow-2xl transition-all ${getDialogClasses()}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
