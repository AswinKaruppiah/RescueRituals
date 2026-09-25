import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

export default function Banner() {
  const { events, loading } = useEvents();
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredEvents = (events || []).slice(0, 5);

  // 1. Loading Skeleton Hero Banner
  if (loading && featuredEvents.length === 0) {
    return (
      <div className="relative w-full">
        <div className="relative h-[65vh] sm:h-[68vh] md:h-[70vh] min-h-[460px] w-full overflow-hidden bg-neutral-900 animate-pulse">
          {/* Bottom Fade Matching Background Color (#262626) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#262626] from-10% via-[#262626]/80 via-50% to-transparent pointer-events-none" />
          <div className="absolute -bottom-1 left-0 right-0 h-4 bg-[#262626] pointer-events-none" />

          {/* Skeleton Content */}
          <div className="absolute bottom-12 sm:bottom-14 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto space-y-3 z-10">
            <div className="h-5 w-28 bg-neutral-800 rounded-full" />
            <div className="h-8 sm:h-12 w-3/4 max-w-lg bg-neutral-800 rounded-xl" />
            <div className="h-4 w-full max-w-xl bg-neutral-800/80 rounded" />
            <div className="h-4 w-2/3 max-w-md bg-neutral-800/60 rounded" />
            <div className="flex items-center gap-4 pt-2">
              <div className="h-4 w-36 bg-neutral-800 rounded" />
              <div className="h-4 w-28 bg-neutral-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty State
  if (featuredEvents.length === 0) return null;

  const safeIndex = currentIndex % featuredEvents.length;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredEvents.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredEvents.length - 1 ? 0 : prev + 1,
    );
  };

  const event = featuredEvents[safeIndex];

  return (
    <div className="relative w-full">
      {/* Responsive Carousel Container */}
      <div
        className="relative h-[65vh] sm:h-[68vh] md:h-[70vh] min-h-[460px] w-full overflow-hidden bg-cover bg-center bg-fixed bg-neutral-900"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        {/* Seamless Bottom Fade to #262626 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#262626] from-10% via-[#262626]/80 via-50% to-transparent pointer-events-none" />
        <div className="absolute -bottom-1 left-0 right-0 h-4 bg-[#262626] pointer-events-none" />

        {/* Event Details (Offset above the indicator dots) */}
        <div className="absolute bottom-12 sm:bottom-14 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto text-white space-y-2.5 sm:space-y-3 z-10">
          <span className="inline-block px-3 py-1 bg-white text-black font-semibold text-[11px] sm:text-xs rounded-full uppercase tracking-wider">
            {event.category}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl line-clamp-1 font-extrabold leading-tight">
            {event.title}
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base line-clamp-2 max-w-3xl leading-relaxed">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-300 pt-1">
            <span className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white shrink-0" /> {event.date} •{" "}
              {event.time}
            </span>
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white shrink-0" /> {event.location}
            </span>
          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 transition z-10 cursor-pointer"
          aria-label="Previous event"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 transition z-10 cursor-pointer"
          aria-label="Next event"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Indicator Dots (Positioned cleanly at bottom without colliding) */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                safeIndex === index
                  ? "w-6 sm:w-8 bg-white"
                  : "w-1.5 sm:w-2 bg-neutral-500/60 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
