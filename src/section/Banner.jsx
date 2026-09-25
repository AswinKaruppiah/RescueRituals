import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

export default function Banner() {
  const { events } = useEvents();
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredEvents = (events || []).slice(0, 5);

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
      {/* Full Width Carousel Container with Fixed Background */}
      <div
        className="relative h-[70vh] w-full overflow-hidden bg-cover bg-center bg-fixed bg-neutral-900"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        {/* Bottom Fade Matching Background Color (#262626) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/70 to-transparent" />

        {/* Event Details */}
        <div className="absolute bottom-8 left-8 right-8 max-w-7xl mx-auto text-white space-y-3">
          <span className="inline-block px-3.5 py-1 bg-white text-black font-semibold text-xs rounded-full uppercase tracking-wider">
            {event.category}
          </span>
          <h2 className="text-3xl md:text-5xl line-clamp-1 font-extrabold">
            {event.title}
          </h2>
          <p className="text-neutral-300 text-sm md:text-base line-clamp-2 max-w-3xl">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-neutral-300 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-white" /> {event.date} •{" "}
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-white" /> {event.location}
            </span>
          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 transition z-10 cursor-pointer"
          aria-label="Previous event"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-neutral-700 transition z-10 cursor-pointer"
          aria-label="Next event"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicator Dots (Max 5) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                safeIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-neutral-500/60 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
