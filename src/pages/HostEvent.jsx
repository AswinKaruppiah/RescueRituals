import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function HostEvent() {
  const navigate = useNavigate();

  // Fresh cover image for hosting
  const hostBannerImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="min-h-screen pb-20">
      
      {/* Full Width Hero Banner with Fixed Background */}
      <div
        className="relative h-[55vh] w-full overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${hostBannerImage})` }}
      >
        {/* Bottom Fade to #262626 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/50 to-transparent pointer-events-none" />

        {/* Floating Top Rounded Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 backdrop-blur-md transition"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Banner Title */}
        <div className="absolute bottom-8 left-6 right-6 max-w-6xl mx-auto">
          <span className="px-3 py-1 bg-white text-black font-semibold text-xs rounded-full uppercase tracking-wider">
            Organizer Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mt-3">
            Host a Community Gathering
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl -mt-16 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-4">
          <h2 className="text-xl font-bold text-white">Event Information</h2>
          <p className="text-neutral-400 text-sm">
            Fill in the details below to create and publish your event.
          </p>
        </div>
      </div>
    </div>
  );
}
