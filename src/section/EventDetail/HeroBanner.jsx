import React from 'react';
import BackButton from '../../components/BackButton';

export default function HeroBanner({ event }) {
  return (
    <div
      className="relative h-[60vh] w-full overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${event.image})` }}
    >
      {/* Bottom Fade to #262626 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/50 to-transparent pointer-events-none" />

      {/* Floating Top Rounded Back Button */}
      <BackButton />
    </div>
  );
}
