import React from 'react';
import BackButton from '../../components/BackButton';

export default function HeroBanner() {
  const hostBannerImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      className="relative h-[55vh] w-full overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${hostBannerImage})` }}
    >
      {/* Bottom Fade to #262626 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/50 to-transparent pointer-events-none" />

      {/* Floating Top Back Button */}
      <BackButton />

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
  );
}
