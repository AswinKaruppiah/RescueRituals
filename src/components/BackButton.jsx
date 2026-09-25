import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ to, className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-20 ${className}`}>
      <button
        onClick={handleBack}
        className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 backdrop-blur-md transition active:scale-95 cursor-pointer shadow-lg"
        aria-label="Go Back"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
