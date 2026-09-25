import React from 'react';
import BackButton from '../../components/BackButton';

export default function HeroBanner({ event }) {
  return (
    <div
      className="relative h-[45vh] sm:h-[55vh] md:h-[60vh] min-h-[320px] w-full overflow-hidden bg-cover bg-center bg-fixed bg-neutral-900"
      style={{ backgroundImage: `url(${event?.image})` }}
    >
      {/* Seamless Bottom Fade to #262626 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#262626] from-10% via-[#262626]/75 via-50% to-transparent pointer-events-none" />
      <div className="absolute -bottom-1 left-0 right-0 h-4 bg-[#262626] pointer-events-none" />

      {/* Floating Top Rounded Back Button */}
      <BackButton />
    </div>
  );
}
