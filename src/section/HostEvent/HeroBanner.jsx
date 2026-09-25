import React from 'react';
import BackButton from '../../components/BackButton';

export default function HeroBanner() {
  const hostBannerImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80';

  return (
    <div
      className="relative h-[42vh] sm:h-[50vh] md:h-[55vh] min-h-[300px] w-full overflow-hidden bg-cover bg-center bg-fixed bg-neutral-900"
      style={{ backgroundImage: `url(${hostBannerImage})` }}
    >
      {/* Seamless Bottom Fade to #262626 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#262626] from-10% via-[#262626]/75 via-50% to-transparent pointer-events-none" />
      <div className="absolute -bottom-1 left-0 right-0 h-4 bg-[#262626] pointer-events-none" />

      {/* Floating Top Back Button */}
      <BackButton />

      {/* Banner Title */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 right-4 sm:right-6 max-w-6xl mx-auto">
        <span className="px-3 py-1 bg-white text-black font-semibold text-[11px] sm:text-xs rounded-full uppercase tracking-wider">
          Organizer Portal
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mt-2.5 sm:mt-3">
          Host a Community Gathering
        </h1>
      </div>
    </div>
  );
}
