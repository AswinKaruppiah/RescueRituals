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
    <div className={`absolute top-6 left-6 z-10 ${className}`}>
      <button
        onClick={handleBack}
        className="p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 backdrop-blur-md transition active:scale-95 cursor-pointer"
        aria-label="Go Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>
  );
}
